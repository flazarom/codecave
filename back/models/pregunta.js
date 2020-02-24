const mongoose = require("mongoose");
const { Schema } = mongoose;

const preguntaSchema = new Schema({
  pregunta: { type: String, required: true },
  categoria: { type: String, required: true },
  desarrollo: { type: String, required: true }
});

module.exports = mongoose.model("Pregunta", preguntaSchema);
