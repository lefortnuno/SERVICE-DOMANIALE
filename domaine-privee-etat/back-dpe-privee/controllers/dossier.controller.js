"use strict";
const Dossier = require("../models/dossier.model");
const SousDossier = require("../models/sousDossier.model");
const AutoNumAffaire = require("../models/numeroAffaire.model");
const Histo = require("../models/historique.model");

module.exports.addDossier = (req, res) => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let {
    numAffaire,
    dependance,
    natureAffectation,
    empietement,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    droitDemande,
    observationDossier,
    lettreDesistement,
    dateRDV,
    planMere,
    certificatSituationJuridique,
    numeroRequerant,
    numCompte,
  } = req.body;

  if (natureAffectation === "Non Affecté") {
    natureAffectation = 0;
  } else if (natureAffectation === "Affecté") {
    natureAffectation = 1;
  }

  const dateAujourdHui = new Date();
  const numPhase = 1;
  const dateDemande = dateAujourdHui;
  
  let obseravation_S_D = observationDossier;
  if (!obseravation_S_D) {
    obseravation_S_D = "Nouvelle Demande.";
  }
  let mesureAttribuable = "NULL";
  let prixAttribue = "NULL";
  let dateDepot_S_D = dateAujourdHui;
  let mouvement = "Arriver";
  let dateMouvement = dateAujourdHui;
  if (!dateRDV) {
    let addRdvDays = 15;
    dateRDV = dateAujourdHui.addDays(addRdvDays);
  }
  let dispoDossier = 1;
  let approbation = 0;
  let accomplissement = 0;
  let Observation = observationDossier;
  let numProcedure = numPhase;

  if (!droitDemande) {
    droitDemande = 5000;
  }

  let newDossier = {
    numAffaire,
    dependance,
    natureAffectation,
    empietement,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    dateDemande,
    droitDemande,
    observationDossier,
    numeroRequerant,
    numPhase,
  };

  let newSousDossier = {
    numAffaire,
    obseravation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  };

  let newHisto = {
    mouvement,
    dateMouvement,
    dateRDV,
    dispoDossier,
    approbation,
    accomplissement,
    Observation,
    numAffaire,
    numCompte,
    numProcedure,
  };

  if (dependance && empietement) {
    /**
     * LE DOSSIER PRESENTE UNE EMPIETINEMENT ET UNE DEPENDANCE
     */
    newSousDossier.lettreDesistement = lettreDesistement;
    newSousDossier.planMere = planMere;
    newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
  } else if (dependance && !empietement) {
    /**
     * LE DOSSIER EST DEPENDANT
     */
    newSousDossier.planMere = planMere;
    newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
  } else if (!dependance && empietement) {
    /**
     * LE DOSSIER PRESENTE UNE EMPIETINEMENT
     */
    newSousDossier.lettreDesistement = lettreDesistement;
  }

  /*
  Ajout Numero Affaire depuis NUMERO_AFFAIRE_INCREMENT_AUTOMATIQUE
  */
  AutoNumAffaire.getLastIdNumeroAffaire((err, lastNumAffaire) => {
    if (!err) {
      numAffaire =
        lastNumAffaire + "-" + numAffaire + "/" + dateAujourdHui.getFullYear();
      newDossier.numAffaire = numAffaire;

      Dossier.addDossier(newDossier, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          newSousDossier.numAffaire = numAffaire;
          SousDossier.addSousDossierNewDemande(newSousDossier);

          newHisto.numAffaire = numAffaire;
          Histo.addHistoNewDemande(newHisto);
          res.send(resp);
        }
      });
    }
  });
};

module.exports.getAllDossiers = (req, res) => {
  Dossier.getAllDossiers((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdDossier = (req, res) => {
  Dossier.getIdDossier(req.params.id, (err, resp) => {
    if (!err) {
      if (resp) {
        res.send(resp);
      } else {
        res.send({ message: "Introuvable" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.updateDossier = (req, res) => {
  const { superficieTerrain, observationDossier } = req.body;

  const updateDossier = {
    observationDossier,
    superficieTerrain,
  };

  Dossier.updateDossier(updateDossier, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.avortementDossier = (req, res) => {
  const { phase } = req.body;

  const updateDossier = {
    phase,
  };

  Dossier.avortementDossier(updateDossier, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchDossier = (req, res) => {
  Dossier.searchDossier(req.params.valeur, (err, resp) => {
    if (!err) {
      if (resp) {
        res.send(resp);
      } else {
        res.send(err);
      }
    } else {
      res.send(err);
    }
  });
};
