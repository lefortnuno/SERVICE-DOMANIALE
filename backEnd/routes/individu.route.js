const router = require("express").Router();
const IndividuController = require("../controllers/individu.controller");
const agent = require("../middlewares/agent.middleware");

router.post("/", agent.checkUtilisateur, IndividuController.addIndividu);
router.get("/", agent.checkUtilisateur, IndividuController.getAllIndividus);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  IndividuController.searchIndividu
);
router.get("/:cin", agent.checkUtilisateur, IndividuController.getCinIndividu);
router.put("/:cin", agent.checkUtilisateur, IndividuController.updateIndividu);
router.get(
  "/apercu/:valeur",
  agent.checkUtilisateur,
  IndividuController.apercuIndividu
);

module.exports = router;
