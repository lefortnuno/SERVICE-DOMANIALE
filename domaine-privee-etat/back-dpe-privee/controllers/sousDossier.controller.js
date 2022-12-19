"use strict";
const { data } = require("jquery");
const SousDossier = require("../models/sousDossier.model");

module.exports.addSousDossier = (req, res) => {
  const {
    numeroAffaire,
    observationSD,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    p_numeroDossier,
    p_numeroAffaire,
  } = req.body;

  const dateDepotSD = new Date();

  const newSousDossier = {
    numeroAffaire,
    observationSD,
    dateDepotSD,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    p_numeroDossier,
    p_numeroAffaire,
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
    observationSD,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
  } = req.body;

  const dateDepotSD = new Date();
  observationSD = observationSD + "(r*)";

  const updateSousDossier = {
    observationSD,
    dateDepotSD,
    mesureAttribuable,
    prixAttribue,
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
