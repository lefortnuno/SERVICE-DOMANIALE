"use strict";
const Dossier = require("../models/dossier.model");
const SousDossier = require("../models/sousDossier.model");
const AutoNumAffaire = require("../models/numeroAffaire.model");

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
  } = req.body;

  if (natureAffectation === "Non Affecté") {
    natureAffectation = 0;
  } else if (natureAffectation === "Affecté") {
    natureAffectation = 1;
  }

  const dateAujourdHui = new Date();
  const numProcedure = 1;
  const dateDemande = dateAujourdHui;
  
  let observation_S_D = observationDossier;
  if (!observation_S_D) {
    observation_S_D = "Nouvelle Demande.";
  }
  let mesureAttribuable = "NULL";
  let prixAttribue = "NULL";
  let dateDepot_S_D = dateAujourdHui;
  if (!dateRDV) {
    let addRdvDays = 15;
    dateRDV = dateAujourdHui.addDays(addRdvDays);
  }

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
    numProcedure,
  };

  let newSousDossier = {
    numAffaire,
    observation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  };

  if (dependance && empietement) {
    //LE DOSSIER PRESENTE UNE EMPIETINEMENT ET UNE DEPENDANCE
    newSousDossier.lettreDesistement = lettreDesistement;
    newSousDossier.planMere = planMere;
    newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
  } else if (dependance && !empietement) {
    //LE DOSSIER EST DEPENDANT
    newSousDossier.planMere = planMere;
    newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
  } else if (!dependance && empietement) {
    //LE DOSSIER PRESENTE UNE EMPIETINEMENT
    newSousDossier.lettreDesistement = lettreDesistement;
  }

  //Ajout Numero Affaire depuis NUMERO_AFFAIRE_INCREMENT_AUTOMATIQUE 
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
  const { numProcedure } = req.body;

  const updateDossier = {
    numProcedure,
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
