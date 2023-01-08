const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");

router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.post("/", utilisateurController.addUtilisateur);
router.get(
	"/",
	agent.checkUtilisateur,
	utilisateurController.getAllUtilisateurs
);
router.get(
	"/numeroCompte/",
	agent.checkUtilisateur,
	utilisateurController.getLastNumeroCompteUtilisateur
);
router.get(
	"/:id",
	agent.checkUtilisateur,
	utilisateurController.getIdUtilisateur
);
router.put(
	"/:id",
	agent.checkUtilisateur,
	utilisateurController.updateUtilisateur
);
router.put(
	"/admin/:id",
	chef.checkUtilisateur,
	utilisateurController.updateUtilisateurByAdministrateur
);
router.put(
	"/photoPDP/:id",
	agent.checkUtilisateur,
	utilisateurController.addPhotoPdp
); 

router.delete(
	"/:id",
	chefAdjoint.checkUtilisateur,
	utilisateurController.deleteUtilisateur
);

router.get(
	"/recherche/:valeur",
	agent.checkUtilisateur,
	utilisateurController.searchUtilisateurByParams
);

module.exports = router;
