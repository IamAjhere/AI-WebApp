const mongoose = require("mongoose");

const predictSchema = new mongoose.Schema({
  Metal: { type: String, required: true },
  Predict_Start: { type: Date, required: true },
  Predicted_Days: { type: Number, required: true },
  Predict_End: { type: Date, required: true },
  index: { type: Array, required: true },
});

const Predict = mongoose.model("predictions", predictSchema);

module.exports = Predict;
