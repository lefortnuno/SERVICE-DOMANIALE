"use strict";
const Individu = require("../models/individu.model");

module.exports.addIndividu = (req, res) => {
  const {
    cin,
    nom,
    prenom,
    lieunais,
    datenais,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    codeEtatCivil,
  } = req.body;

  const newIndividu = {
    cin,
    nom,
    prenom,
    lieunais,
    datenais,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    codeEtatCivil,
  };

  Individu.addIndividu(newIndividu, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllIndividus = (req, res) => {
  Individu.getAllIndividus((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCinIndividu = (req, res) => {
  Individu.getCinIndividu(req.params.cin, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchIndividu = (req, res) => {
  const { value } = req.body;
  Individu.searchIndividu({ value }, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "individu non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.updateIndividu = (req, res) => {
  const {
    cin,
    nom,
    prenom,
    lieunais,
    datenais,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    codeEtatCivil,
  } = req.body;
  const updateIndividu = {
    cin,
    nom,
    prenom,
    lieunais,
    datenais,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    codeEtatCivil,
  };

  Individu.updateIndividu(updateIndividu, req.params.cin, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
