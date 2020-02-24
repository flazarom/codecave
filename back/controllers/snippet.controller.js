const Snippet = require("../models/snippet");

const snippetCtrl = {};

snippetCtrl.getSnippets = async (req, res, next) => {
  const snippets = await Snippet.find();
  res.json(snippets);
};

snippetCtrl.createSnippet = async (req, res, next) => {
  const snippet = new Snippet({
    titulo: req.body.titulo,
    lenguaje: req.body.lenguaje, 
    desarrollo: req.body.desarrollo,
    likes: req.body.likes,
    creador: req.body.creador
  });
  await snippet.save();
  res.json({ status: "Snippet created" });
};

snippetCtrl.getSnippet = async (req, res, next) => {
  const { id } = req.params;
  const snippet = await Snippet.findById(id);
  res.json(snippet);
};

snippetCtrl.editSnippet = async (req, res, next) => {
  const { id } = req.params;
  const snippet = {
    titulo: req.body.titulo,
    lenguaje: req.body.lenguaje, 
    desarrollo: req.body.desarrollo,
    likes: req.body.likes,
    creador: req.body.creador
  };
  await Snippet.findByIdAndUpdate(id, { $set: snippet }, { new: true });
  res.json({ status: "Snippet Updated" });
};

snippetCtrl.deleteSnippet = async (req, res, next) => {
  await Snippet.findByIdAndRemove(req.params.id);
  res.json({ status: "Snippet Deleted" });
};

module.exports = snippetCtrl;
