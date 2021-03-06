const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    unique: true
  },
  email: { type: String, required: false, unique: true },
  photoUrl: { type: String, required: false },
  bio: { type: String, required: false },
  web: { type: String, required: false },
  contact: { type: Array, required: false },
  medals: { type: Array, required: false }
});

module.exports = mongoose.model("User", userSchema);
