const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  categoria: { type: Array, required: true },
  likes: { type: Number, required: false },
  creador: { type: String, required: true }
});

module.exports = mongoose.model("Tutorial", userSchema);
