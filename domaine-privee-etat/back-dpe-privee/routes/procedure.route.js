const router = require("express").Router();
const ProcedureController = require("../controllers/procedure.controller");

router.post("/", ProcedureController.addProcedure);
router.get("/", ProcedureController.getAllProcedures);
router.get("/:id", ProcedureController.getIdProcedure);
router.put("/:id", ProcedureController.updateProcedure);

module.exports = router;
