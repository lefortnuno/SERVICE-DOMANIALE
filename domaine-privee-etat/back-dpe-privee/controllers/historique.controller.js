"use strict";
const Historique = require("../models/historique.model");

module.exports.addHistorique = (req, res) => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let addRdvDays = 15;

  let {
    mouvement,
    dateMouvement,
    dateRDV,
    Observation,
    numAffaire,
    numCompte,
    numProcedure,
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
    Observation,
    numAffaire,
    numCompte,
    numProcedure,
  };

  Historique.addHistorique(newHistorique, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
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
    mouvement,
    dateMouvement,
    dateRDV,
    Observation,
    numAffaire,
    numCompte,
  } = req.body;
  const updateHistorique = {
    mouvement,
    dateMouvement,
    dateRDV,
    Observation,
    numAffaire,
    numCompte,
  };

  Historique.updateHistorique(updateHistorique, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
