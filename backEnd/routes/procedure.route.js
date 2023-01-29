const router = require("express").Router();
const ProcedureController = require("../controllers/procedure.controller");
const client = require("../middlewares/client.middleware");

router.post("/", client.checkUtilisateur, ProcedureController.addProcedure);

router.get("/", client.checkUtilisateur, ProcedureController.getAllProcedures);
router.get("/:id", client.checkUtilisateur, ProcedureController.getIdProcedure);
router.get(
	"/recherche/:valeur",
	client.checkUtilisateur,
	ProcedureController.searchProcedure
);

router.put(
	"/:id",
	client.checkUtilisateur,
	ProcedureController.updateProcedure
);

module.exports = router;
