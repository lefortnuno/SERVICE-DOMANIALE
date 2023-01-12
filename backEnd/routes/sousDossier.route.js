const router = require("express").Router();
const SousDossierController = require("../controllers/sousDossier.controller");
const agent = require("../middlewares/agent.middleware");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");

router.get(
	"/",
	agent.checkUtilisateur,
	SousDossierController.getAllSousDossiersOfDossier
);
router.get(
	"/attenteVISA/",
	chef.checkUtilisateur,
	SousDossierController.getAllAttenteVISA
);
router.get(
	"/attentePREVISA/",
	chefAdjoint.checkUtilisateur,
	SousDossierController.getAllAttentePREVISA
);
router.get(
	"/lastSousDossier/:id",
	agent.checkUtilisateur,
	SousDossierController.getLastSousDossierOfDossier
);
router.get(
	"/decompte/:id",
	agent.checkUtilisateur,
	SousDossierController.getDecompte
);
router.get(
	"/:id",
	agent.checkUtilisateur,
	SousDossierController.getIdSousDossier
);

router.post("/", agent.checkUtilisateur, SousDossierController.addSousDossier);

router.put(
	"/:id",
	agent.checkUtilisateur,
	SousDossierController.updateSousDossier
);

module.exports = router;
