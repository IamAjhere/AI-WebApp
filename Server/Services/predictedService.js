require("dotenv").config();
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

const news = async (metals, req, res) => {
  APIKEY = process.env.NEWSAPI_SECRET;
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  axios
    .get(
      `https://newsapi.org/v2/everything?q=finance%AND%${metals}&from=${today}&language=en&sortBy=publishedAt&apiKey=${APIKEY}`
    )
    .then((r) => {
      const text = r.data.articles[0].description;
      const options = {
        method: "GET",
        url: "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
        params: { text: text },
        headers: {
          "X-RapidAPI-Key": process.env.SENTIMENT_SECRET,
          "X-RapidAPI-Host": "twinword-sentiment-analysis.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          res.send(response.data.type);
        })
        .catch(function (error) {
          res.send(error);
        });
    });

  //res.send(text);
};

module.exports = { predict, news };
