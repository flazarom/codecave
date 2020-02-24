const express = require("express");
const router = express.Router();

const pregunta = require("../controllers/pregunta.controller");

router.get("/", pregunta.getPreguntas);
router.post("/", pregunta.createPregunta);
router.get("/:id", pregunta.getPregunta);
router.put("/:id", pregunta.editPregunta);
router.delete("/:id", pregunta.deletePregunta);

module.exports = router;
