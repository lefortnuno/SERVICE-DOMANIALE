"use strict";
const { data } = require("jquery");
const Dossier = require("../models/dossier.model");
const SousDossier = require("../models/sousDossier.model");
const AutoNumAffaire = require("../models/numeroAffaire.model");

module.exports.addDossier = (req, res) => {
  let {
    numAffaire,
    dependance,
    empietement,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    droitDemande,
    cin,
    numCompte,
    observationDossier,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    obseravation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribuable,
  } = req.body;

  const dateAujourdHui = new Date();
  const phase = 1      
  const dateDemande = dateAujourdHui;
  superficieTerrain = superficieTerrain + ' h.a'

  if (!droitDemande){
    droitDemande = 5000
  }
  if (!numCompte){
    numCompte = 1
  }

  let newDossier = {
    numAffaire,
    dependance,
    empietement,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    dateDemande,
    droitDemande,
    cin,
    numCompte,
    phase,
    observationDossier,
  };

  let newSousDossier = {
    numAffaire,
    obseravation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
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
      newSousDossier.numAffaire = numAffaire;

      Dossier.addDossier(newDossier, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
          newSousDossier.obseravation_S_D = "nouvelle demande";
          newSousDossier.mesureAttribuable = "NULL";
          newSousDossier.prixAttribuable = "NULL";
          newSousDossier.dateDepot_S_D = dateAujourdHui;

          SousDossier.addSousDossierNewDemande(newSousDossier);
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
      if (resp){
        res.send(resp);
      }  else {
        res.send({message:"Introuvable"});
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.updateDossier = (req, res) => {
  const { phase, superficieTerrain, observationDossier } = req.body;

  const updateDossier = {
    phase, observationDossier, superficieTerrain
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

module.exports.searchDossierByParams = (req, res) => {
  Dossier.searchDossierByParams(req.params.valeur, (err, resp) => {
    if (!err) {
      if (resp){
        res.send(resp);
      }  else {
        res.send(err);
      }
    } else {
      res.send(err);
    }
  });
};
