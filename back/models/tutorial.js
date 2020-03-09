const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  title: { type: String, required: true },
  tutorial: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Array, required: false },
  owner: { type: String, required: true }
});

module.exports = mongoose.model("Tutorial", userSchema);
