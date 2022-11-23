"use strict";
const Procedure = require("../models/procedure.model");

module.exports.addProcedure = (req, res) => {
  const {
    nomProcedure,
    idBureau,
  } = req.body;

  const newProcedure = {
    nomProcedure,
    idBureau,
  };

  Procedure.addProcedure(newProcedure, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllProcedures = (req, res) => {
  Procedure.getAllProcedures((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdProcedure = (req, res) => {
  Procedure.getIdProcedure(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};


module.exports.updateProcedure = (req, res) => {
  const {
    nomProcedure,
    idBureau,
  } = req.body;
  const updateProcedure = {
    nomProcedure,
    idBureau,
  };

  Procedure.updateProcedure(updateProcedure, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
