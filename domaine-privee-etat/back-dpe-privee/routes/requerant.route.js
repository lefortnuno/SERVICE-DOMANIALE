const router = require("express").Router();
const requerantController = require("../controllers/requerant.controller");
const admin = require("../middlewares/admin.middleware");
const chef = require("../middlewares/chef.middleware");
const chefAdjoint = require("../middlewares/chef.adjoint.middleware");
const agent = require("../middlewares/agent.middleware");

router.post(
  "/",
  chefAdjoint.checkUtilisateur,
  requerantController.addRequerant
);
router.get("/", agent.checkUtilisateur, requerantController.getAllRequerants);
router.get("/:id", agent.checkUtilisateur, requerantController.getIdRequerant);
router.put("/:id", agent.checkUtilisateur, requerantController.updateRequerant);
router.get(
  "/recherche/:valeur",
  agent.checkUtilisateur,
  requerantController.searchRequerant
);
router.delete("/:id", requerantController.deleteRequerant);

module.exports = router;
