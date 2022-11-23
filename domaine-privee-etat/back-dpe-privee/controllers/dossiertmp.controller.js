"use strict";
const Dossiertmp = require("../models/dossiertmp.model");

module.exports.addDossierTemporaire = (req, res) => {
  const {
    dependance,
    lettreDemande,
    planAnnexe,
    superficieTerrain,
    pvDelimitation,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    cin,
  } = req.body;

  let newDossierTemporaire = {
    dependance,
    lettreDemande,
    planAnnexe,
    superficieTerrain,
    pvDelimitation,
    cin,
  };

  if (dependance == 1 && lettreDesistement == 1) {
    // dependant et empietement Existe ICI
    newDossierTemporaire.lettreDesistement = lettreDesistement;
    newDossierTemporaire.planMere = planMere;
    newDossierTemporaire.certificatSituationJuridique =
      certificatSituationJuridique;
  } else if (dependance == 0 && lettreDesistement == 0) {
    // NON dependant et PAS empietement ICI
  } else if (dependance == 1 && lettreDesistement == 0) {
    newDossierTemporaire.planMere = planMere;
    newDossierTemporaire.certificatSituationJuridique =
      certificatSituationJuridique;
  } else if (dependance == 0 && lettreDesistement == 1) {
    newDossierTemporaire.lettreDesistement = lettreDesistement;
  }

  Dossiertmp.addDossierTemporaire(newDossierTemporaire, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllDossierTemporaires = (req, res) => {
  Dossiertmp.getAllDossierTemporaires((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdDossierTemporaire = (req, res) => {
  Dossiertmp.getIdDossierTemporaire(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateDossierTemporaire = (req, res) => {
  const {
    dependance,
    lettreDemande,
    planAnnexe,
    superficieTerrain,
    pvDelimitation,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    cin,
  } = req.body;

  const newDossierTemporaire = {
    dependance,
    lettreDemande,
    planAnnexe,
    superficieTerrain,
    pvDelimitation,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    cin,
  };

  Dossiertmp.updateDossierTemporaire(
    newDossierTemporaire,
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

module.exports.deleteDossierTemporaire = (req, res) => {
  Dossiertmp.deleteDossierTemporaire(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchDossierTemporaire = (req, res) => {
  const { cin } = req.body;
  Dossiertmp.searchDossierTemporaire({ cin }, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
