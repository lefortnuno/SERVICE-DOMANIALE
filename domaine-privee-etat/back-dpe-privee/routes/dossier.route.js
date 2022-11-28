const router = require("express").Router();
const DossierController = require("../controllers/dossier.controller");
const agent = require("../middlewares/agent.middleware");

router.get("/", agent.checkUtilisateur, DossierController.getAllDossiers);
router.get("/:id", agent.checkUtilisateur, DossierController.getIdDossier);
router.post("/", agent.checkUtilisateur, DossierController.addDossier);
router.put("/:id", agent.checkUtilisateur, DossierController.updateDossier);
router.put(
  "/avc/:id",
  agent.checkUtilisateur,
  DossierController.avortementDossier
);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  DossierController.searchDossier
);

module.exports = router;
