const router = require("express").Router();
const StatsController = require("../controllers/stats.controller");
const agent = require("../middlewares/agent.middleware");

router.get(
  "/all_stats_procedure_month/",
  agent.checkUtilisateur,
  StatsController.getAllStatsProcedureByMonth
);
router.get(
  "/stats_temps_perdu_procedure/",
  agent.checkUtilisateur,
  StatsController.getTempsPerduByProcedure
);
router.get(
  "/stats_sigle/",
  agent.checkUtilisateur,
  StatsController.getStatsBySigle
);

router.get(
  "/stats_temps_perdu_dossier_procedure/:id",
  // agent.checkUtilisateur,
  StatsController.getTempsPerduOfDossierByProcedure
);

module.exports = router;
