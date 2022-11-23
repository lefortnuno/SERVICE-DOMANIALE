const router = require("express").Router();
const DossierController = require("../controllers/dossier.controller");

router.get("/", DossierController.getAllDossiers);
router.get("/:id", DossierController.getIdDossier);
router.post("/", DossierController.addDossier);
router.put("/:id", DossierController.updateDossier);
router.put("/avc/:id", DossierController.avortementDossier);
router.get("/recherche/:valeur", DossierController.searchDossierByParams);

module.exports = router;
