"use strict";
const Individu = require("../models/individu.model");
const EtatCivil = require("../models/etatCivil.model");
const Requerant = require("../models/requerant.model");

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
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateNature,
    lieuNature,
    etatMorale,
    complementInformation,
  } = req.body;

  let codeEtatCivil = 0;

  const newEtatCivil = {
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateNature,
    lieuNature,
  };

  const newRequerant = {
    etatMorale,
    cin,
    complementInformation,
  };

  let newIndividu = {
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

  EtatCivil.addEtatCivil(newEtatCivil, (err, resEC) => {
    if (err) {
      res.send(err);
    } else {
      EtatCivil.getLastEtatCivil((error, resLastID) => {
        if (error) {
          res.send(error);
        } else {
          const id = resLastID[0]
          newIndividu.codeEtatCivil = id;

          Individu.addIndividu(newIndividu, (erreur, resI) => {
            if (erreur) {
              res.send(erreur);
            } else {
              Requerant.addRequerant(newRequerant, (erreurs, resReq) => {
                if (erreurs) {
                  res.send(erreurs);
                } else {
                  res.send(resI);
                  console.log(resI);
                }
              });
            }
          });
        }
      });
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
