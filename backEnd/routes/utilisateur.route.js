const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");
const client = require("../middlewares/client.middleware");

router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.post("/", utilisateurController.addUtilisateur);

router.get(
	"/",
	chefAdjoint.checkUtilisateur,
	utilisateurController.getAllUtilisateurs
);
router.get(
	"/attenteActivation/",
	chefAdjoint.checkUtilisateur,
	utilisateurController.getAttenteActivation
);
router.get(
	"/liseAttenteActivation/",
	chefAdjoint.checkUtilisateur,
	utilisateurController.getAllAttenteActivation
);
router.get(
	"/numeroCompte/",
	client.checkUtilisateur,
	utilisateurController.getLastNumeroCompteUtilisateur
);
router.get(
	"/:id",
	client.checkUtilisateur,
	utilisateurController.getIdUtilisateur
);
router.get(
	"/recherche/:valeur",
	chefAdjoint.checkUtilisateur,
	utilisateurController.searchUtilisateurByParams
);

router.put(
	"/:id",
	client.checkUtilisateur,
	utilisateurController.updateUtilisateur
);
router.put(
	"/admin/:id",
	chef.checkUtilisateur,
	utilisateurController.updateUtilisateurByAdministrateur
);
router.put(
	"/statu/:id",
	chefAdjoint.checkUtilisateur,
	utilisateurController.updateUtilisateurStatu
);
router.put(
	"/photoPDP/:id",
	client.checkUtilisateur,
	utilisateurController.addPhotoPdp
);

router.delete(
	"/:id",
	chefAdjoint.checkUtilisateur,
	utilisateurController.deleteUtilisateur
);

module.exports = router;
