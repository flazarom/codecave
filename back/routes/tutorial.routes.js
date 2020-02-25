const express = require("express");
const router = express.Router();

const tutorial = require("../controllers/tutorial.controller");

router.get("/", tutorial.getTutoriales);
router.post("/", tutorial.createTutorial);
router.get("/:id", tutorial.getTutorial);
router.put("/:id", tutorial.editTutorial);
router.delete("/:id", tutorial.deleteTutorial);

module.exports = router;
