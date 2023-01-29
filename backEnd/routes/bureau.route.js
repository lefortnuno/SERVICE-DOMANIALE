const router = require("express").Router();
const BureauController = require("../controllers/bureau.controller");
const client = require("../middlewares/client.middleware");

router.post("/", client.checkUtilisateur, BureauController.addBureau);

router.get("/", client.checkUtilisateur, BureauController.getAllBureau);
router.get("/:id", client.checkUtilisateur, BureauController.getIdBureau);
router.get(
	"/recherche/:valeur",
	client.checkUtilisateur,
	BureauController.searchBureau
);

router.put("/:id", client.checkUtilisateur, BureauController.updateBureau);

module.exports = router;
