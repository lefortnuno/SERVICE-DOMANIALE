const router = require("express").Router();
const IndividuController = require("../controllers/individu.controller");

router.post("/", IndividuController.addIndividu);
router.get("/", IndividuController.getAllIndividus);
router.get("/:cin", IndividuController.getCinIndividu);
router.put("/:cin", IndividuController.updateIndividu);
router.post("/search", IndividuController.searchIndividu);

module.exports = router;
