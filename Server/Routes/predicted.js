const router = require("express").Router();
const Predicted = require("../Services/predictedService");

router.get("/prediction/:metal", async (req, res) => {
  var metals = req.params.metal;
  Predicted.predict(metals, req, res);
});

router.get("/prediction/news/:metal", async (req, res) => {
  var metals = req.params.metal;
  Predicted.news(metals, req, res);
});

module.exports = router;
