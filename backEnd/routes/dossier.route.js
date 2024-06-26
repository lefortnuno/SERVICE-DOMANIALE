const router = require("express").Router();
const DossierController = require("../controllers/dossier.controller");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");
const client = require("../middlewares/client.middleware");

router.get("/", agent.checkUtilisateur, DossierController.getAllDossiers);
router.get(
	"/nouvelledemande/",
	agent.checkUtilisateur,
	DossierController.getDossiersNouvelleDemande
);
router.get(
	"/historique/:id",
	agent.checkUtilisateur,
	DossierController.getHistoDossier
);
router.get(
	"/recherche/:valeur",
	agent.checkUtilisateur,
	DossierController.searchDossier
);
router.get("/:id", client.checkUtilisateur, DossierController.getIdDossier);

router.post(
	"/mesDossiers/",
	agent.checkUtilisateur,
	DossierController.getMesDossiers
);
router.post(
	"/mesDossiers/Usagers/",
	client.checkUtilisateur,
	DossierController.getMesDossiersUsagers
);
router.post(
	"/mesDossiers/recherche/",
	agent.checkUtilisateur,
	DossierController.searchMonDossier
);
router.post("/", chefAdjoint.checkUtilisateur, DossierController.addDossier);

router.put(
	"/avc/:id",
	chefAdjoint.checkUtilisateur,
	DossierController.avortementDossier
);
router.put(
	"/autoUpD/",
	agent.checkUtilisateur,
	DossierController.updateAutoDossier
);
router.put("/:id", agent.checkUtilisateur, DossierController.updateDossier);

module.exports = router;
