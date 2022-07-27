import React, { useState } from "react";
import Chart from "../Components/chart";
import Choosepanel from "../Components/choosepanel";
import "./CSS/predicted.css";

function Predicted() {
  const [metal, setMetal] = useState("Gold");
  const [prediction, setPrediction] = useState([]);
  const [isloading, setLoading] = useState(false);
  return (
    <div className="Pred-Container">
      <div className="Pred-item">
        <div className="Pred-item-1 p-3 mb-2">
          <Choosepanel
            isloading={isloading}
            setLoading={setLoading}
            Metal={metal}
            setMetal={setMetal}
            prediction={prediction}
            setPrediction={setPrediction}
          />
        </div>
        <div className="Pred-item-2">
          {isloading ? <h1>loading</h1> : <Chart />}
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default Predicted;
