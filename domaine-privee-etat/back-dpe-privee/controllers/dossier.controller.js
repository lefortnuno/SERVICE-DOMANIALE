"use strict";
const Dossier = require("../models/dossier.model");
const SousDossier = require("../models/sousDossier.model");
const AutoNumAffaire = require("../models/numeroAffaire.model");

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const dateAujourdHui = new Date();

module.exports.addDossier = (req, res) => {
  let {
    numeroAffaire,
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
    p_numeroRequerant,
    dateDemande,
  } = req.body;

  const p_numeroProcedure = 1;
  let observationSD = observationDossier;
  let mesureAttribuable = "NULL";
  let prixAttribue = "NULL";
  let dateDepotSD = dateAujourdHui;

  if (!dateDemande) {
    dateDemande = dateAujourdHui;
  }
  if (!observationSD) {
    observationSD = "Nouvelle Demande.";
  }
  if (!dateRDV) {
    let addRdvDays = 15;
    dateRDV = dateAujourdHui.addDays(addRdvDays);
  }

  let newDossier = {
    numeroAffaire,
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
    p_numeroRequerant,
    p_numeroProcedure,
  };

  let newSousDossier = {
    numeroAffaire,
    observationSD,
    dateDepotSD,
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
      numeroAffaire =
        lastNumAffaire +
        "-" +
        numeroAffaire +
        "/" +
        dateAujourdHui.getFullYear();
      newDossier.numeroAffaire = numeroAffaire;

      Dossier.addDossier(newDossier, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          newSousDossier.numeroAffaire = numeroAffaire;
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

module.exports.getDossiersNouvelleDemande = (req, res) => {
  Dossier.getDossiersNouvelleDemande((err, resp) => {
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
        res.send({ success: false, message: "Introuvable" });
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
  const { p_numeroProcedure } = req.body;

  const updateDossier = {
    p_numeroProcedure,
  };
  Dossier.updateDossier(updateDossier, req.params.id, (err, resp) => {
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
