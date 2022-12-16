const router = require("express").Router();
const DossierController = require("../controllers/dossier.controller");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");

router.get("/", agent.checkUtilisateur, DossierController.getAllDossiers);
router.get("/nouvelledemande/", agent.checkUtilisateur, DossierController.getDossiersNouvelleDemande);
router.get("/:id", agent.checkUtilisateur, DossierController.getIdDossier);
router.post("/", chefAdjoint.checkUtilisateur, DossierController.addDossier);
router.put("/:id", agent.checkUtilisateur, DossierController.updateDossier);
router.put(
  "/avc/:id",
  chefAdjoint.checkUtilisateur,
  DossierController.avortementDossier
);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  DossierController.searchDossier
);

module.exports = router;
