const router = require("express").Router();
const PhaseController = require("../controllers/phase.controller");

router.post("/", PhaseController.addPhase);
router.get("/", PhaseController.getAllPhases);
router.get("/:id", PhaseController.getIdPhase);
router.put("/:id", PhaseController.updatePhase);

module.exports = router;
