"use strict";
const Bureau = require("../models/bureau.model");

module.exports.addBureau = (req, res) => {
  const {
    nomBureau,
    adressBureau,
  } = req.body;

  const newBureau = {
    nomBureau,
    adressBureau,
  };

  Bureau.addBureau(newBureau, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllBureau = (req,res) => {
  Bureau.getAllBureau((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdBureau = (req, res) => {
  Bureau.getIdBureau(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateBureau = (req, res) => {
  const {
    nomBureau,
    adressBureau,
  } = req.body;

  const updateBureau = {
    nomBureau,
    adressBureau,
  };

  Bureau.updateBureau(updateBureau, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchBureau = (req, res) => {
  Bureau.searchBureau(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};