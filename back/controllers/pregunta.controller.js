const Pregunta = require("../models/pregunta");

const preguntaCtrl = {};

preguntaCtrl.getPreguntas = async (req, res, next) => {
  const preguntas = await Pregunta.find();
  res.json(preguntas);
};

preguntaCtrl.createPregunta = async (req, res, next) => {
  const pregunta = new Pregunta({
    pregunta: req.body.pregunta,
    categoria: req.body.categoria,
    desarrollo: req.body.desarrollo,
    likes: req.body.likes,
    creador: req.body.creador
  });
  await pregunta.save();
  res.json({ status: "Pregunta created" });
};

preguntaCtrl.getPregunta = async (req, res, next) => {
  const { id } = req.params;
  const pregunta = await Pregunta.findById(id);
  res.json(pregunta);
};

preguntaCtrl.editPregunta = async (req, res, next) => {
  const { id } = req.params;
  const pregunta = {
    pregunta: req.body.pregunta,
    categoria: req.body.categoria,
    desarrollo: req.body.desarrollo,
    likes: req.body.likes,
    creador: req.body.creador
  };
  await Pregunta.findByIdAndUpdate(id, { $set: pregunta }, { new: true });
  res.json({ status: "Pregunta Updated" });
};

preguntaCtrl.deletePregunta = async (req, res, next) => {
  await Pregunta.findByIdAndRemove(req.params.id);
  res.json({ status: "Pregunta Deleted" });
};

module.exports = preguntaCtrl;
