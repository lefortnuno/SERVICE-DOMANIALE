const router = require("express").Router();
const EtatCivilController = require("../controllers/etatCivil.controller");

router.post("/", EtatCivilController.addEtatCivil);
router.get("/", EtatCivilController.getAllEtatCivils);
router.get("/:id", EtatCivilController.getIdEtatCivil);
router.put("/:id", EtatCivilController.updateEtatCivil);

module.exports = router;
