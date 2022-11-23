const router = require("express").Router();
const TerrainController = require("../controllers/terrain.controller");

router.post("/", TerrainController.addTerrain);
router.get("/", TerrainController.getAllTerrains);
router.get("/:id", TerrainController.getIdTerrain);
router.put("/:id", TerrainController.updateTerrain);
router.post("/search", TerrainController.searchTerrain);

module.exports = router;
