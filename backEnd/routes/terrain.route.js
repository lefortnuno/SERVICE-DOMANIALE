const router = require("express").Router();
const TerrainController = require("../controllers/terrain.controller");

router.get("/", TerrainController.getAllTerrains);
router.get("/:id", TerrainController.getIdTerrain);

router.put("/prixTerrain/:id", TerrainController.ajoutPrixDuTerrain);
router.put("/:id", TerrainController.updateTerrain);

router.post("/le_Terrain/", TerrainController.le_Terrain);
router.post("/", TerrainController.addTerrain);
router.post("/recherche", TerrainController.searchTerrain);


module.exports = router;
