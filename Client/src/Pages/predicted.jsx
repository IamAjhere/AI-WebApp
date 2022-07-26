import React, { useState } from "react";
import Chart from "../Components/chart";
import Choosepanel from "../Components/choosepanel";

function Predicted() {
  const [metal, setMetal] = useState("Gold");
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Choosepanel
        setLoading={setLoading}
        Metal={metal}
        setMetal={setMetal}
        prediction={prediction}
        setPrediction={setPrediction}
      />
      <div>{loading ? <h1>loading</h1> : <Chart />}</div>
    </div>
  );
}

export default Predicted;
