const router = require("express").Router();
const SousDossierController = require("../controllers/sousDossier.controller");
const agent = require("../middlewares/agent.middleware");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const client = require("../middlewares/client.middleware");

router.get(
	"/",
	agent.checkUtilisateur,
	SousDossierController.getAllSousDossiersOfDossier
);

router.get(
	"/nbAttenteVISA/",
	chef.checkUtilisateur,
	SousDossierController.getNbAttenteVISA
);
router.get(
	"/attenteVISA/",
	chef.checkUtilisateur,
	SousDossierController.getAllAttenteVISA
);

router.get(
	"/nbAttentePREVISA/",
	chefAdjoint.checkUtilisateur,
	SousDossierController.getNbAttentePREVISA
);
router.get(
	"/attentePREVISA/",
	chefAdjoint.checkUtilisateur,
	SousDossierController.getAllAttentePREVISA
);

router.get(
	"/lastSousDossier/:id",
	client.checkUtilisateur,
	SousDossierController.getLastSousDossierOfDossier
);
router.get(
	"/decompte/:id",
	client.checkUtilisateur,
	SousDossierController.getDecompte
);
router.get(
	"/:id",
	client.checkUtilisateur,
	SousDossierController.getIdSousDossier
);

router.post("/", agent.checkUtilisateur, SousDossierController.addSousDossier);

router.put(
	"/:id",
	agent.checkUtilisateur,
	SousDossierController.updateSousDossier
);

module.exports = router;
