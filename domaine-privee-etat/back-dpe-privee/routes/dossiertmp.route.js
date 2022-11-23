const router = require("express").Router();
const dossiertemporaireController = require("../controllers/dossiertmp.controller");
// const middlewareAuth = require('../middlewares/auth.middleware')

// router.get("/", middlewareAuth.checkUtilisateur, dossiertemporaireController.getAllUtilisateurs)
router.get("/", dossiertemporaireController.getAllDossierTemporaires);
router.get("/:id", dossiertemporaireController.getIdDossierTemporaire);
router.post("/", dossiertemporaireController.addDossierTemporaire);

router.put("/:id", dossiertemporaireController.updateDossierTemporaire);
router.delete("/:id", dossiertemporaireController.deleteDossierTemporaire);
router.post("/search", dossiertemporaireController.searchDossierTemporaire);

module.exports = router;
