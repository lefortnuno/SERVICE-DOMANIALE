const router = require("express").Router();
const StatsController = require("../controllers/stats.controller");
const agent = require("../middlewares/agent.middleware");
const client = require("../middlewares/client.middleware");

router.get(
  "/all_stats_procedure_month/",
  agent.checkUtilisateur,
  StatsController.getAllStatsProcedureByMonth
);
router.get(
  "/stats_temps_perdu_procedure/",
  client.checkUtilisateur,
  StatsController.getTempsPerduByProcedure
);
router.get(
  "/stats_sigle/",
  agent.checkUtilisateur,
  StatsController.getStatsBySigle
);

router.get(
  "/stats_temps_perdu_dossier_procedure/:id",
  client.checkUtilisateur,
  StatsController.getTempsPerduOfDossierByProcedure
);

module.exports = router;
