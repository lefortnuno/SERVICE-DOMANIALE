const router = require("express").Router();
const DossierController = require("../controllers/dossier.controller");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");

router.get("/", agent.checkUtilisateur, DossierController.getAllDossiers);
router.get(
  "/nouvelledemande/",
  agent.checkUtilisateur,
  DossierController.getDossiersNouvelleDemande
);
router.get(
  "/historique/:id",
  agent.checkUtilisateur,
  DossierController.getHistoDossier
);
router.get("/:id", agent.checkUtilisateur, DossierController.getIdDossier);

router.post(
  "/mesDossiers/",
  agent.checkUtilisateur,
  DossierController.getMesDossiers
);
router.post(
  "/mesDossiers/recherche/",
  agent.checkUtilisateur,
  DossierController.searchMonDossier
);
router.post("/", chefAdjoint.checkUtilisateur, DossierController.addDossier);

router.put(
  "/avc/:id",
  chefAdjoint.checkUtilisateur,
  DossierController.avortementDossier
);
router.put(
  "/autoUpD/",
  agent.checkUtilisateur,
  DossierController.updateAutoDossier
);

router.put("/:id", agent.checkUtilisateur, DossierController.updateDossier);

router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  DossierController.searchDossier
);

module.exports = router;
