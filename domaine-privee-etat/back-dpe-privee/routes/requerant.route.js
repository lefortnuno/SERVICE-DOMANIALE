const router = require("express").Router();
const requerantController = require("../controllers/requerant.controller");
const agent = require("../middlewares/agent.middleware");

router.post(
  "/",
  agent.checkUtilisateur,
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

module.exports = router;
