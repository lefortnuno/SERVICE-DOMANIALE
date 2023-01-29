const router = require("express").Router();
const TerrainController = require("../controllers/terrain.controller");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");
const client = require("../middlewares/client.middleware");

router.get("/", agent.checkUtilisateur, TerrainController.getAllTerrains);
router.get("/:id", agent.checkUtilisateur, TerrainController.getIdTerrain);

router.put(
	"/prixTerrain/:id",
	agent.checkUtilisateur,
	TerrainController.ajoutPrixDuTerrain
);
router.put("/:id", agent.checkUtilisateur, TerrainController.updateTerrain);

router.post(
	"/le_Terrain/",
	agent.checkUtilisateur,
	TerrainController.le_Terrain
);
router.post("/", agent.checkUtilisateur, TerrainController.addTerrain);
router.post(
	"/recherche",
	agent.checkUtilisateur,
	TerrainController.searchTerrain
);

module.exports = router;
