"use strict";
const Requerant = require("../models/requerant.model");

module.exports.addRequerant = (req, res) => {
  const {
    cin,
    etatMorale,
    complementInformation,
  } = req.body;

  const newRequerant = {
    cin,
    etatMorale,
    complementInformation,
  };

  Requerant.addRequerant(newRequerant, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllRequerants = (req, res) => {
  Requerant.getAllRequerants((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdRequerant = (req, res) => {
  Requerant.getIdRequerant(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchRequerant = (req, res) => {
  Requerant.searchRequerant(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateRequerant = (req, res) => {
  const {
    etatMorale,
    complementInformation,
  } = req.body;
  const updateRequerant = {
    etatMorale,
    complementInformation,
  };

  Requerant.updateRequerant(updateRequerant, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
