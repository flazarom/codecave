const express = require("express");
const router = express.Router();

const medal = require("../controllers/medal.controller");

router.get("/", medal.getMedals);
router.post("/", medal.createMedal);
router.get("/:medalname", medal.getMedal);
router.put("/:id", medal.editMedal);
router.delete("/:id", medal.deleteMedal);

module.exports = router;
