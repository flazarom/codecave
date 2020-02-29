const mongoose = require("mongoose");
const { Schema } = mongoose;

const medalSchema = new Schema({
  medalname: { type: String, required: false },
  medaldesc: { type: String, required: false, }
});

module.exports = mongoose.model("Medal", medalSchema);
