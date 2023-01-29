const router = require("express").Router();
const EtatCivilController = require("../controllers/etatCivil.controller");
const agent = require("../middlewares/agent.middleware");

router.post("/", agent.checkUtilisateur, EtatCivilController.addEtatCivil);

router.get("/", agent.checkUtilisateur, EtatCivilController.getAllEtatCivils);
router.get("/:id", agent.checkUtilisateur, EtatCivilController.getIdEtatCivil);

router.put("/:id", agent.checkUtilisateur, EtatCivilController.updateEtatCivil);

module.exports = router;
