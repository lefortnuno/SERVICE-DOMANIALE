"use strict";
const { data } = require("jquery");
const SousDossier = require("../models/sousDossier.model");

module.exports.addSousDossier = (req, res) => {
  const {
    numAffaire,
    obseravation_S_D,
    mesureAttribuable,
    prixAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  } = req.body;

  const dateDepot_S_D = new Date();

  const newSousDossier = {
    numAffaire,
    obseravation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  };

  SousDossier.addSousDossier(
    newSousDossier, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllSousDossiersOfDossier = (req, res) => {
  SousDossier.getAllSousDossiersOfDossier((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdSousDossier = (req, res) => {
  SousDossier.getIdSousDossier(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateSousDossier = (req, res) => {
  let {
    obseravation_S_D,
    mesureAttribuable,
    prixAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  } = req.body;

  const dateDepot_S_D = new Date();
  obseravation_S_D = obseravation_S_D + " ( rectification !) ";

  const updateSousDossier = {
    obseravation_S_D,
    dateDepot_S_D,
    mesureAttribuable,
    prixAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  };

  SousDossier.updateSousDossier(
    updateSousDossier,
    req.params.id,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};