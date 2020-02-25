const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: false },
  email: { type: String, required: false },
  photoUrl: { type: String, required: false },
  bio: { type: String, required: false },
  web: { type: String, required: false },
  github: { type: String, required: false },
  gitlab: { type: String, required: false },
  bitbucket: { type: String, required: false }
});

module.exports = mongoose.model("User", userSchema);
