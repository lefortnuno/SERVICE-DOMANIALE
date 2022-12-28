"use strict";
const Individu = require("../models/individu.model");
const EtatCivil = require("../models/etatCivil.model");
const Requerant = require("../models/requerant.model");
const { response } = require("express");
const { addDossier } = require("../models/dossier.model");

module.exports.addIndividu = (req, res) => {
  let {
    cin,
    nom,
    prenom,
    lieuNaiss,
    dateNaiss,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    etatMorale,
    numeroTelephone,
    complementInformation,
    etatCivil,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  } = req.body;

  let p_codeEtatCivil = 0;
  const p_cin = cin;

  let newEtatCivil = {
    etatCivil,
  };

  if (etatCivil === "Marié") {
    const addNewEtatCivil = {
      cinConjoint,
      nomConjoint,
      prenomConjoint,
      dateEtatCivil,
      lieuEtatCivil,
    };
    newEtatCivil = Object.assign(newEtatCivil, addNewEtatCivil);
  }

  if (etatMorale === "false") {
    etatMorale = false;
  } else if (etatMorale === "true") {
    etatMorale = true;
  }

  const newRequerant = {
    etatMorale,
    p_cin,
    numeroTelephone,
    complementInformation,
  };

  let newIndividu = {
    cin,
    nom,
    prenom,
    lieuNaiss,
    dateNaiss,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    p_codeEtatCivil,
  };


  EtatCivil.addEtatCivil(newEtatCivil, (err, resEC) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      EtatCivil.getLastEtatCivil((error, resLastID) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          const id = resLastID[0];
          newIndividu.p_codeEtatCivil = id;

          Individu.addIndividu(newIndividu, (erreur, resI) => {
            if (erreur) {
              console.log(erreur);
              res.send(erreur);
            } else {
              Requerant.addRequerant(newRequerant, (erreurs, resReq) => {
                if (erreurs) {
                  console.log(erreurs);
                  res.send(erreurs);
                } else {
                  res.send(resI);
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
  Individu.searchIndividu(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.apercuIndividu = (req, res) => {
  Individu.apercuIndividu(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
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
    lieuNaiss,
    dateNaiss,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
    p_codeEtatCivil,
    etatCivil,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  } = req.body;

  const updateIndividu = {
    cin,
    nom,
    prenom,
    lieuNaiss,
    dateNaiss,
    profession,
    domicile,
    dateLivrance,
    lieuLivrance,
  };

  const updateEtatCivilIndividu = {
    p_codeEtatCivil,
    etatCivil,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  };
  Individu.updateIndividu(updateIndividu, req.params.cin, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      EtatCivil.updateEtatCivil(
        updateEtatCivilIndividu,
        updateEtatCivilIndividu.p_codeEtatCivil,
        (erreur, reponse) => {
          if (!erreur) {
            res.send(response);
          } else {
            resp.send(erreur);
          }
        }
      );
      res.send(err);
    }
  });
};
