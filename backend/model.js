const mongoose = require("mongoose");

const ApiSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: String, enum: ["Safe", "Suspicious"], required: true },
  accuracy: { type: Number, required: true },
});

module.exports = mongoose.model("API", ApiSchema);
