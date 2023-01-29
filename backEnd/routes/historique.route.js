const router = require("express").Router();
const HistoriqueController = require("../controllers/historique.controller");
const agent = require("../middlewares/agent.middleware");
const client = require("../middlewares/client.middleware");

router.post("/", agent.checkUtilisateur, HistoriqueController.addHistorique);
router.post(
	"/histoND/",
	agent.checkUtilisateur,
	HistoriqueController.addHistoNewDemande
);
router.post(
	"/autoProcedure/",
	agent.checkUtilisateur,
	HistoriqueController.addAutoHistorique
);

router.get("/", agent.checkUtilisateur, HistoriqueController.getAllHistoriques);
router.get(
	"/C_ND/",
	agent.checkUtilisateur,
	HistoriqueController.getCahierNouvelleDemande
);
router.get(
	"/C_RDV/",
	agent.checkUtilisateur,
	HistoriqueController.getCahierRendezVous
);
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
	"/histoDossier/:id",
	agent.checkUtilisateur,
	HistoriqueController.getHistoriqueDossier
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

router.put(
	"/next/:id",
	agent.checkUtilisateur,
	HistoriqueController.nextProcedureHistorique
);

router.put(
	"/retour/:id",
	agent.checkUtilisateur,
	HistoriqueController.retourProcedureHistorique
);

router.get(
	"/C_ND/recherche/:valeur",
	agent.checkUtilisateur,
	HistoriqueController.searchHistorique
);
router.get(
	"/C_RDV/recherche/:valeur",
	agent.checkUtilisateur,
	HistoriqueController.searchHistoriqueRDV
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
