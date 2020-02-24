const mongoose = require("mongoose");
const { Schema } = mongoose;

const snippetSchema = new Schema({
  titulo: { type: String, required: true },
  lenguaje: { type: String, required: true }, 
  desarrollo: { type: String, required: true }
});

module.exports = mongoose.model("Snippet", snippetSchema);
