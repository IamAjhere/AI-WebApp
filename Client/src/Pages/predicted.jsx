import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import Chart from "../Components/chart";
import Skeleton from "react-loading-skeleton";
import Choosepanel from "../Components/choosepanel";
import GlobalChat from "../Components/globalchat";
import { io } from "socket.io-client";

function Predicted() {
  const [Metal, setMetal] = useState("Gold");
  const [prediction, setPrediction] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [nextday, setNextday] = useState("");
  const [lastday, setLastday] = useState("");
  const [lastprice, setLastprice] = useState("");
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:2000");
    if (Metal) {
      socket.current.emit("join-room", Metal, (message) => {
        test(message);
      });
    }
    const fetchPrice = async () => {
      setLoading(true);
      await axios.get(`/prediction/${Metal}`).then((r) => {
        setPrediction(r.data);
        setLoading(false);
      });
    };
    fetchPrice();
  }, [Metal, setLoading, setPrediction]);

  function test(test) {
    console.log(test);
  }
  useEffect(() => {
    return () => {
      socket.current.close();
      console.log("disconnect");
    };
  }, [Metal]);
  useEffect(() => {
    if (prediction.length > 0) {
      setPrice(prediction[0].Predicted_Price);
      const nextdaysplit = prediction[0].Date.split("T");
      const lastdaysplit = prediction[prediction.length - 1].Date.split("T");
      setNextday(nextdaysplit[0]);
      setLastday(lastdaysplit[0]);
      setLastprice(prediction[prediction.length - 1].Predicted_Price);
    }
  }, [prediction]);
  return (
    <div className="d-grid">
      <div className="row">
        <div className="col-9 ">
          <div className="p-2">
            <Choosepanel
              isloading={isloading}
              setLoading={setLoading}
              Metal={Metal}
              setMetal={setMetal}
              prediction={prediction}
              setPrediction={setPrediction}
              nextday={nextday}
              price={price}
              lastprice={lastprice}
            />
          </div>
          <div className="p-2">
            {isloading ? (
              <Skeleton height={505} />
            ) : (
              <Chart
                price={prediction}
                from={nextday}
                to={lastday}
                metal={Metal}
              />
            )}
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <div className="card">
              <div className="card-header">Global Chat - {Metal}</div>
              <div className="card-body chat-block d-flex flex-column">
                <GlobalChat Metal={Metal} socket={socket} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predicted;
