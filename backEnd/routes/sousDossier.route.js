const router = require("express").Router();
const SousDossierController = require("../controllers/sousDossier.controller");
const agent = require("../middlewares/agent.middleware");

router.get(
  "/",
  agent.checkUtilisateur,
  SousDossierController.getAllSousDossiersOfDossier
);
router.get(
  "/:id",
  agent.checkUtilisateur,
  SousDossierController.getIdSousDossier
);
router.post("/", agent.checkUtilisateur, SousDossierController.addSousDossier);
router.put(
  "/:id",
  agent.checkUtilisateur,
  SousDossierController.updateSousDossier
);

module.exports = router;
