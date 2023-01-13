"use strict";
const Stat = require("../models/stats.model");

module.exports.getAllStatsProcedureByMonth = (req, res) => {
    Stat.getAllStatsProcedureByMonth((err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    });
  };
  
module.exports.getTempsPerduOfDossierByProcedure = (req, res) => {
  const {numeroDossier} = req.body;

  Stat.getTempsPerduOfDossierByProcedure(numeroDossier, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getTempsPerduByProcedure = (req, res) => {
    Stat.getTempsPerduByProcedure((err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    });
  };
  
module.exports.getStatsBySigle = (req, res) => {
    Stat.getStatsBySigle((err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    });
  };