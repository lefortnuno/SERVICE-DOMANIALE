const router = require("express").Router();
const StatsController = require("../controllers/stats.controller");
const agent = require("../middlewares/agent.middleware");


// router.get("/all_stats_procedure_month/", agent.checkUtilisateur, StatsController.getAllStatsProcedureByMonth);
router.get("/all_stats_procedure_month/", StatsController.getAllStatsProcedureByMonth);
router.get("/stats_temps_perdu_procedure/", StatsController.getTempsPerduByProcedure);
router.get("/stats_sigle/", StatsController.getStatsBySigle);

module.exports = router;