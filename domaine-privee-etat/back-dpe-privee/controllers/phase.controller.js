"use strict";
const Phase = require("../models/phase.model");

module.exports.addPhase = (req, res) => {
  const {
    nomPhase,
    naturePhase,
  } = req.body;

  const newPhase = {
    nomPhase,
    naturePhase,
  };

  Phase.addPhase(newPhase, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllPhases = (req,res) => {
  Phase.getAllPhases((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdPhase = (req, res) => {
  Phase.getIdPhase(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updatePhase = (req, res) => {
  const {
    nomPhase,
    naturePhase,
  } = req.body;
  const updatePhase = {
    nomPhase,
    naturePhase,
  };

  Phase.updatePhase(updatePhase, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
