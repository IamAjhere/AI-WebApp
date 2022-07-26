const Predict = require("../Models/predict");
const axios = require("axios");

const predict = (metals, req, res) => {
  Predict.findOne({ Metal: metals }, function (err, result) {
    var today = new Date();
    if (result) {
      var pricedata = result.index;
      var resultdata = pricedata.filter(function (a) {
        var date = new Date(a.Date);
        return date > today;
      });
      res.send(resultdata);
    }
    if (err) {
      res.send(err);
    }
  });
};

const news = async (req, res) => {
  await axios.get(
    "https://newsapi.org/v2/everything?q=gold&from=2022-07-25&to=2022-07-25&sortBy=popularity&apiKey="
  );
};

module.exports = { predict };
