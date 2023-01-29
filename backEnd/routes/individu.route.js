const router = require("express").Router();
const IndividuController = require("../controllers/individu.controller");
const agent = require("../middlewares/agent.middleware");
const chefAdjoint = require("../middlewares/chef.middleware");

router.post("/", agent.checkUtilisateur, IndividuController.addIndividu);

router.put("/:cin", agent.checkUtilisateur, IndividuController.updateIndividu);

router.get("/", agent.checkUtilisateur, IndividuController.getAllIndividus);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  IndividuController.searchIndividu
);
router.get("/:cin", agent.checkUtilisateur, IndividuController.getCinIndividu);
router.get(
  "/apercu/:valeur",
  agent.checkUtilisateur,
  IndividuController.apercuIndividu
);

router.delete(
  "/:cin",
  chefAdjoint.checkUtilisateur,
  IndividuController.deleteIndividu
);

module.exports = router;
