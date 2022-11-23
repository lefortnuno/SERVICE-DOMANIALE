const router = require("express").Router();
const SousDossierController = require("../controllers/sousDossier.controller");

router.get("/", SousDossierController.getAllSousDossiersOfDossier);
router.get("/:id", SousDossierController.getIdSousDossier);
router.post("/", SousDossierController.addSousDossier);
router.put("/:id", SousDossierController.updateSousDossier);

module.exports = router;
