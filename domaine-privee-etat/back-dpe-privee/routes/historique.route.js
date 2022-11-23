const router = require("express").Router();
const HistoriqueController = require("../controllers/historique.controller");

router.post("/", HistoriqueController.addHistorique);
router.get("/", HistoriqueController.getAllHistoriques);
router.get("/:id", HistoriqueController.getIdHistorique);
router.put("/:id", HistoriqueController.updateHistorique);
router.post("/search", HistoriqueController.searchHistorique);

module.exports = router;
