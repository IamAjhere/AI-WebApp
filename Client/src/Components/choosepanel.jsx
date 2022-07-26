import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function Choosepanel({
  setLoading,
  Metal,
  setMetal,
  prediction,
  setPrediction,
}) {
  const [price, setPrice] = useState("");
  const [lastprice, setLastprice] = useState("");
  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      await axios.get(`/prediction/${Metal}`).then((r) => {
        setPrediction(r.data);
        setLoading(false);
      });
    };
    const fetchNews = async () => {
      await axios.get("/prediction/news").then((r) => {
        console.log(r);
      });
    };

    fetchPrice();
    fetchNews();
  }, [Metal, setLoading, setPrediction]);

  useEffect(() => {
    if (prediction.length > 0) {
      setPrice(prediction[0].Predicted_Price);
      setLastprice(prediction[prediction.length - 1].Predicted_Price);
    }
  }, [prediction]);

  const handlechange = (e) => {
    setMetal(e.target.value);
  };

  return (
    <div>
      <label className="text-secondary" htmlFor="metals">
        Choose a Metal:
      </label>
      <select
        name="metals"
        id="metals"
        onChange={handlechange}
        defaultValue="Select"
      >
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Platinum">Platinum</option>
      </select>
      <h4>Closing Price Tomorrow - {price}</h4>
      {price > lastprice ? <h4>Bearish</h4> : <h4>Bullish</h4>}
    </div>
  );
}

export default Choosepanel;
