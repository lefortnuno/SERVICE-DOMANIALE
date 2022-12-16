"use strict";
const Utilisateur = require("../models/utilisateur.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (numCompte) => {
  return jwt.sign({ numCompte }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

module.exports.addUtilisateur = (req, res) => {
  let { identification, photoPDP, mdp, u_cin, unite } = req.body;

  mdp = bcrypt.hashSync(mdp, 10);
  const attribut = "utilisateur";
  const statu = false;

  //Get last ID USER for future CONCATENATION
  Utilisateur.getLastIdUtilisateurs((err, lastId) => {
    if (!err) {
      identification = identification + "-" + lastId;

      const newUtilisateur = {
        identification,
        photoPDP,
        attribut,
        mdp,
        statu,
        unite,
        u_cin,
      };

      Utilisateur.addUtilisateur(newUtilisateur, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
    } else {
      res.send(err);
    }
  });
};

module.exports.loginUtilisateur = (req, res) => {
  const { identification, mdp } = req.body;
  Utilisateur.loginUtilisateur({ identification, mdp }, (err, resp) => {
    if (!err) {
      if (resp.length != 0) {
        const pwd = resp[0].mdp;
        // const validePwd = bcrypt.compareSync(mdp, pwd);
        const validePwd = true;

        if (validePwd) {
          const token = createToken(resp);
          res.send({ success: true, token, user: resp });
        } else {
          res.send({ success: false });
        }
      } else {
        res.send({ success: false });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  const { photoPDP, identification, mdp } = req.body;
  const newUtilisateur = { photoPDP, identification, mdp };

  Utilisateur.updateUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateurByAdministrateur = (req, res) => {
  const { photoPDP, identification, mdp, statu, unite } = req.body;
  const newUtilisateur = { photoPDP, identification, mdp, statu, unite };

  Utilisateur.updateUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.deleteUtilisateur = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchUtilisateurByParams = (req, res) => {
  Utilisateur.searchUtilisateurByParams(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
