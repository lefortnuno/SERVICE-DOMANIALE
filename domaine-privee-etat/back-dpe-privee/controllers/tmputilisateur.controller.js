"use strict";
const Utilisateur = require("../models/tmputilisateur.model");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (numCompte) => {
  return jwt.sign({ numCompte }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

const storageFace = multer.diskStorage({
  destination: path.join(
    __dirname,
    "../../front-dpe-privee-avec-design/public/",
    "tmp-pic-user"
  ),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports.addUtilisateur = (req, res) => {
  let { identification, mdp, u_cin, unite } = req.body;


  mdp = bcrypt.hashSync(mdp, 10);
  const photoPDP = "Aucune";
  const attribut = "utilisateur";
  let statu = false;

  if (unite === "true") {
    unite = true;
  } else if(unite === "false") {
    unite = false;
  }

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

module.exports.addPhotoPdp = (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storageFace }).single("photoPDP");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Selectioner une image à enregistrer.");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        photoPDP: req.file.filename,
      };

      Utilisateur.updateUtilisateur(
        classifiedsadd,
        req.params.id,
        (err, resp) => {
          if (err) {
            res.send(err);
          } else {
            res.send(resp);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
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

module.exports.getLastNumeroCompteUtilisateur = (req, res) => {
  Utilisateur.getLastNumeroCompteUtilisateur((err, resp) => {
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
