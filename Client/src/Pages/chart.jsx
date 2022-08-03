import React, { useState } from "react";
import TradingViewWidget from "react-tradingview-widget";
function Chart() {
  const [Metal, setMetal] = useState("Gold");
  return (
    <>
      <div className="card m-5 ">
        <div className="card-header d-flex w-auto">
          <h3 className="m-1">Metal</h3>
          <select
            className="form-select"
            name="metals"
            id="metals"
            onChange={(e) => setMetal(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <div className="card-body">
          <TradingViewWidget symbol={`TVC:${Metal}`} hide_top_toolbar={true} />
        </div>
      </div>
    </>
  );
}

export default Chart;
