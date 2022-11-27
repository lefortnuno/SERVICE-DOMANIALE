const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");

router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.post("/", chefAdjoint.checkUtilisateur, utilisateurController.addUtilisateur);
router.put("/role/:id", utilisateurController.roleUtilisateur);
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
router.delete(
  "/:id",
  agent.checkUtilisateur,
  utilisateurController.deleteUtilisateur
);
router.get(
  "/recherche/:valeur",
  utilisateurController.searchUtilisateurByParams
);

module.exports = router;
