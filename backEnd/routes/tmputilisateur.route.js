const router = require("express").Router();
const utilisateurController = require("../controllers/tmputilisateur.controller");

router.post("/", utilisateurController.addUtilisateur);
router.get(
  "/",
  utilisateurController.getAllUtilisateurs
);
router.get(
  "/numeroCompte/",
  utilisateurController.getLastNumeroCompteUtilisateur
);
router.get(
  "/:id",
  utilisateurController.getIdUtilisateur
);
router.put(
  "/:id",
  utilisateurController.updateUtilisateur
);
router.put(
  "/admin/:id",
  utilisateurController.updateUtilisateurByAdministrateur
);
router.put(
  "/photoPDP/:id",
  utilisateurController.addPhotoPdp
);
router.delete(
  "/:id",
  utilisateurController.deleteUtilisateur
);
router.get(
  "/recherche/:valeur",
  utilisateurController.searchUtilisateurByParams
);

module.exports = router;
