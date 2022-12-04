"use strict";
const Historique = require("../models/historique.model");
const Dossier = require("../models/dossier.model");

module.exports.addHistorique = (req, res) => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const accomplissement = 0;
  const approbation = 0;
  const addRdvDays = 15;

  let {
    mouvement,
    dateMouvement,
    dateRDV,
    observation,
    numAffaire,
    numCompte,
    dispoDossier,
  } = req.body;

  if (!dateMouvement && !dateRDV) {
    dateMouvement = new Date();
    dateRDV = dateMouvement.addDays(addRdvDays);
  } else if (dateMouvement && !dateRDV) {
    dateRDV = new Date().addDays(addRdvDays);
  } else if (!dateMouvement && dateRDV) {
    dateMouvement = new Date();
  }

  const newHistorique = {
    mouvement,
    dateMouvement,
    dateRDV,
    observation,
    numAffaire,
    numCompte,
    dispoDossier,
    accomplissement,
    approbation,
  };

  Historique.addHistorique(newHistorique, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      
      res.send(resp);
    }
  });
};

module.exports.addHistoNewDemande = (req, res) => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const addRdvDays = 15;
  const dateAujourdHui = new Date();
  const mouvement = "Arriver";
  const dateMouvement = dateAujourdHui;
  const dispoDossier = 1;
  const approbation = 0;
  const accomplissement = 0;
  const observation = "Aucune";
  const numAffaire = "NULL";

  let {
    dateRDV,
    numCompte,
  } = req.body;

  let newHisto = {
    mouvement,
    dateMouvement,
    dateRDV,
    dispoDossier,
    approbation,
    accomplissement,
    observation,
    numAffaire,
    numCompte,
  };

  if (!dateMouvement && !dateRDV) {
    dateMouvement = new Date();
    dateRDV = dateMouvement.addDays(addRdvDays);
  } else if (dateMouvement && !dateRDV) {
    dateRDV = new Date().addDays(addRdvDays);
  } else if (!dateMouvement && dateRDV) {
    dateMouvement = new Date();
  }
  Dossier.getDerniereDossier((err, resp) => {
    if(err){
      res.send(err);
    } else {
      if (resp){
        newHisto.numAffaire = resp[0].numAffaire;
        newHisto.observation = resp[0].observationDossier;
        
        Historique.addHistoNewDemande(newHisto);
      }
    }
  })
};

module.exports.getAllHistoriques = (req, res) => {
  Historique.getAllHistoriques((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCahierArriver = (req, res) => {
  Historique.getCahierArriver((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCahierDepart = (req, res) => {
  Historique.getCahierDepart((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCahierInterne = (req, res) => {
  Historique.getCahierInterne((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdHistorique = (req, res) => {
  Historique.getIdHistorique(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchHistorique = (req, res) => {
  Historique.searchHistorique(req.params.valeur, (err, resp) => {
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

module.exports.updateHistorique = (req, res) => {
  const {
    dateMouvement,
    dateRDV,
    observation,
    numCompte,
    dispoDossier,
    approbation,
  } = req.body;
  const updateHistorique = {
    dateMouvement,
    dateRDV,
    observation,
    numCompte,
    dispoDossier,
    approbation,
  };

  Historique.updateHistorique(updateHistorique, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.nextProcedureHistorique = (req, res) => {
  const { approbationUP, numProcedure, numAffaire } = req.body;

  const accomplissement = 1;
  const approbation = approbationUP;

  const updateHistorique = {
    accomplissement,
    approbation,
  };

  const updateDossier = {
    numProcedure,
  };
  
  Dossier.updateDossierProcedureByNumAffaire(updateDossier, numAffaire, (erreur, response) => {
    if (erreur){
      res.send(erreur)
    } else {
      Historique.updateHistorique(updateHistorique, req.params.id, (err, resp) => {
        if (!err) {
          res.send(resp);
        } else {
          res.send(err);
        }
      });
    }
  })
};
