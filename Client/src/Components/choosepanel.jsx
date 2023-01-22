import React, { useState } from "react";
import axios from "../api/axios";
import Skeleton from "react-loading-skeleton";
import ClipLoader from "react-spinners/ClipLoader";
function Choosepanel({
  isloading,
  Metal,
  setMetal,
  nextday,
  price,
  lastprice,
}) {
  const [news, setNews] = useState("btn");

  const fetchNews = async () => {
    setNews("load");
    await axios.get(`/prediction/news/${Metal}`).then((r) => {
      setNews(r.data.charAt(0).toUpperCase() + r.data.slice(1));
    });
  };

  const handlechange = (e) => {
    setMetal(e.target.value);
    setNews("btn");
  };

  const manageNews =
    news === "load" ? (
      <ClipLoader />
    ) : news === "btn" ? (
      <button type="button" className="btn btn-dark" onClick={fetchNews}>
        Load
      </button>
    ) : news === "" ? (
      <span className="text-muted">Neutral</span>
    ) : (
      <span className={news === "Positive" ? "text-success " : "text-danger"}>
        {news}
      </span>
    );

  return (
    <div className="card">
      <div className="card-header d-flex w-auto">
        <h3 className="m-1">Metal</h3>
        <select
          className="form-select m-2 "
          name="metals"
          id="metals"
          onChange={handlechange}
          defaultValue="Select"
        >
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
        </select>
      </div>
      <div className="card-body d-flex gap-3">
        <div className="card ">
          <div className="card-header text-center">
            <h5>Closing Price Tomorrow</h5>
          </div>
          <div className="card-body text-center">
            {isloading ? (
              <Skeleton />
            ) : (
              <>
                <span className="text-muted">{nextday}</span> <br />
                {price}
              </>
            )}
          </div>
        </div>
        <div className="card flex-fill">
          <div className="card-header text-center">
            <h5>AI Analytics</h5>
          </div>
          <div className="card-body text-center ">
            {console.log(lastprice, price)}
            {isloading ? (
              <Skeleton />
            ) : price > lastprice ? (
              <h5 className="text-danger align-items-center">Bearish ▼</h5>
            ) : (
              <h5 className="text-success font-weight-bold">Bullish ▲</h5>
            )}
          </div>
        </div>

        <div className="card ">
          <div className="card-header text-center">
            <h5>News Analytics</h5>
          </div>
          <div className="card-body text-center">{manageNews}</div>
        </div>
      </div>
    </div>
  );
}

export default Choosepanel;
