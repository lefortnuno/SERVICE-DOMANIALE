const router = require("express").Router();
const BureauController = require("../controllers/bureau.controller");

router.post("/", BureauController.addBureau);
router.get("/", BureauController.getAllBureau);
router.get("/:id", BureauController.getIdBureau);
router.put("/:id", BureauController.updateBureau);
router.get(
    "/recherche/:valeur",
    BureauController.searchBureau
  );

module.exports = router;
