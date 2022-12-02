const router = require("express").Router();
const HistoriqueController = require("../controllers/historique.controller");
const agent = require("../middlewares/agent.middleware");

router.post("/", agent.checkUtilisateur, HistoriqueController.addHistorique);
router.get("/", agent.checkUtilisateur, HistoriqueController.getAllHistoriques);
router.get(
  "/C_I/",
  agent.checkUtilisateur,
  HistoriqueController.getCahierInterne
);
router.get(
  "/C_D/",
  agent.checkUtilisateur,
  HistoriqueController.getCahierDepart
);
router.get(
  "/C_A/",
  agent.checkUtilisateur,
  HistoriqueController.getCahierArriver
);
router.get(
  "/:id",
  agent.checkUtilisateur,
  HistoriqueController.getIdHistorique
);
router.put(
  "/:id",
  agent.checkUtilisateur,
  HistoriqueController.updateHistorique
);
router.get(
  "/C_I/recherche/:valeur",
  agent.checkUtilisateur,
  HistoriqueController.searchHistorique
);
router.get(
  "/C_D/recherche/:valeur",
  agent.checkUtilisateur,
  HistoriqueController.searchHistorique
);
router.get(
  "/C_A/recherche/:valeur",
  agent.checkUtilisateur,
  HistoriqueController.searchHistorique
);

module.exports = router;
