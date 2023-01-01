const router = require("express").Router();
const requerantController = require("../controllers/requerant.controller");
const agent = require("../middlewares/agent.middleware");
const chefAdjoint = require("../middlewares/chef.middleware");

router.post("/", agent.checkUtilisateur, requerantController.addRequerant);

router.get("/", agent.checkUtilisateur, requerantController.getAllRequerants);
router.get("/:id", agent.checkUtilisateur, requerantController.getIdRequerant);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  requerantController.searchRequerant
);
router.get(
  "/apercu/:valeur",
  agent.checkUtilisateur,
  requerantController.apercuRequerant
);

router.put("/:id", agent.checkUtilisateur, requerantController.updateRequerant);

router.delete(
  "/:id",
  chefAdjoint.checkUtilisateur,
  requerantController.deleteRequerant
);

module.exports = router;
