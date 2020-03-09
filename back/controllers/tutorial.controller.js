const Tutorial = require("../models/tutorial");

const tutorialCtrl = {};

tutorialCtrl.getTutoriales = async (req, res, next) => {
  const tutoriales = await Tutorial.find();
  res.json(tutoriales);
};

tutorialCtrl.createTutorial = async (req, res, next) => {
  const tutorial = new Tutorial({
    title: req.body.title,
    tutorial: req.body.tutorial,
    category: req.body.category,
    likes: req.body.likes,
    owner: req.body.owner
  });
  await tutorial.save();
  res.json({ status: "Tutorial created" });
};

tutorialCtrl.getTutorial = async (req, res, next) => {
  const { id } = req.params;
  const tutorial = await Tutorial.findById(id);
  res.json(tutorial);
};

tutorialCtrl.editTutorial = async (req, res, next) => {
  const { id } = req.params;
  const tutorial = {
    title: req.body.title,
    tutorial: req.body.tutorial,
    category: req.body.category,
    likes: req.body.likes,
    owner: req.body.owner
  };
  await Tutorial.findByIdAndUpdate(id, { $set: tutorial }, { new: true });
  res.json({ status: "Tutorial Updated" });
};

tutorialCtrl.deleteTutorial = async (req, res, next) => {
  await Tutorial.findByIdAndRemove(req.params.id);
  res.json({ status: "Tutorial Deleted" });
};

module.exports = tutorialCtrl;
