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
  agent.checkUtilisateur,
  utilisateurController.updateUtilisateurByAdministrateur
);
router.delete(
  "/:id",
  chef.checkUtilisateur,
  utilisateurController.deleteUtilisateur
);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  utilisateurController.searchUtilisateurByParams
);

module.exports = router;
