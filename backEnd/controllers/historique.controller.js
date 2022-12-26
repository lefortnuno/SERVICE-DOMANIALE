"use strict";
const Historique = require("../models/historique.model");
const Dossier = require("../models/dossier.model");

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Format date aujourdhui pour mysql
let today = new Date();
let dateAujourdHui = new Date();

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();

const fomatDateAujourdHui = y + "-" + m + "-" + d;

module.exports.addHistorique = (req, res) => {
  const accomplissement = false;
  const approbation = false;
  const addRdvDays = 15;

  let {
    mouvement,
    dateRDV,
    observation,
    h_numeroAffaire,
    h_numeroDossier,
    p_numeroCompte,
    dispoDossier,
  } = req.body;

  const dateDebutMouvement = fomatDateAujourdHui;

  if (!dateRDV) {
    dateRDV = dateAujourdHui.addDays(addRdvDays);
  }

  const newHistorique = {
    mouvement,
    dateDebutMouvement,
    dateRDV,
    observation,
    h_numeroAffaire,
    h_numeroDossier,
    p_numeroCompte,
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
  const addRdvDays = 15;
  const dateAujourdHui = new Date();
  const mouvement = "Arriver";
  const dateDebutMouvement = dateAujourdHui;
  const dispoDossier = true;
  const approbation = false;
  const accomplissement = false;
  const observation = "Aucune";
  const h_numeroAffaire = "NULL";
  const dateFinMouvement = "NULL";

  let { dateRDV, p_numeroCompte } = req.body;

  let newHisto = {
    mouvement,
    dateDebutMouvement,
    dateFinMouvement,
    dateRDV,
    dispoDossier,
    approbation,
    accomplissement,
    observation,
    h_numeroAffaire,
    p_numeroCompte,
  };

  if (!dateDebutMouvement && !dateRDV) {
    dateDebutMouvement = new Date();
    dateRDV = dateDebutMouvement.addDays(addRdvDays);
  } else if (dateDebutMouvement && !dateRDV) {
    dateRDV = new Date().addDays(addRdvDays);
  } else if (!dateDebutMouvement && dateRDV) {
    dateDebutMouvement = new Date();
  }
  Dossier.getDerniereDossier((err, resp) => {
    if (err) {
      res.send(err);
    } else {
      if (resp) {
        newHisto.h_numeroAffaire = resp[0].h_numeroAffaire;
        newHisto.observation = resp[0].observationDossier;

        Historique.addHistoNewDemande(newHisto);
      }
    }
  });
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

module.exports.getCahierNouvelleDemande = (req, res) => {
  Historique.getCahierNouvelleDemande((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCahierRendezVous = (req, res) => {
  Historique.getCahierRendezVous((err, resp) => {
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

module.exports.searchHistoriqueRDV = (req, res) => {
  Historique.searchHistoriqueRDV(req.params.valeur, (err, resp) => {
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
    dateDebutMouvement,
    dateRDV,
    observation,
    p_numeroCompte,
    dispoDossier,
    approbation,
  } = req.body;
  const updateHistorique = {
    dateDebutMouvement,
    dateRDV,
    observation,
    p_numeroCompte,
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
  const { approbationUP, p_numeroProcedure, h_numeroAffaire } = req.body;

  const accomplissement = true;
  const approbation = approbationUP;
  const dateFinMouvement = fomatDateAujourdHui;

  const updateHistorique = {
    accomplissement,
    approbation,
    dateFinMouvement,
  };

  const updateDossier = {
    p_numeroProcedure,
  };

  Dossier.updateDossierProcedureByNumAffaire(
    updateDossier,
    h_numeroAffaire,
    (erreur, response) => {
      if (erreur) {
        res.send(erreur);
      } else {
        Historique.updateHistorique(
          updateHistorique,
          req.params.id,
          (err, resp) => {
            if (!err) {
              res.send(resp);
            } else {
              res.send(err);
            }
          }
        );
      }
    }
  );
};