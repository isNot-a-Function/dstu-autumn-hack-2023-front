import React, { useState, useEffect } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";

import { flightApi } from "../store";
import Loader from "../components/Loader";
import ReservedWagon from "../components/Main/ReservedWagon";
import TrainCard from "../components/Main/TrainCard";

const Flight = () => {
  const flightId = window.location.pathname.replace("/flight/", "");
  const { data: flight, isLoading } = flightApi.useGetFlightQuery(flightId);
  const [selectWagon, setSelectWagon] = useState<number>(
    flight?.flights?.carrriages[0].carriageNumber || 0
  );
  const [isShowResponseModal, setIsShowResponseModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowDeclineOrder, setIsShowDeclineOrder] = useState(false);
  const [isShowDone, setIsShowDone] = useState(false);

  useEffect(() => {
    if (flight) {
      setSelectWagon(flight?.flights?.carrriages[0].carriageNumber);
    }
  }, [flight]);
  const user =
    localStorage.getItem("user") != null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  if (isLoading || !flight?.flights.carrriages) return <Loader />;
  return (
    <div className="container box-deal-page ">
      <div className="info-train">
        <TrainCard data={flight?.flights} />
      </div>

      {flight?.flights?.carrriages.map((item, index) => {
        if (selectWagon === item.carriageNumber) {
          return (
            <div key={index} className="box-flight">
              <div className="title-box-wagon">
                <button
                  onClick={() => {
                    const el =
                      flight?.flights?.carrriages[index - 1]?.carriageNumber;
                    if (el !== undefined) {
                      setSelectWagon(el);
                    } else {
                      setSelectWagon(
                        flight?.flights?.carrriages[
                          flight?.flights?.carrriages.length - 1
                        ].carriageNumber
                      );
                    }
                  }}
                >
                  ❮{" "}
                </button>
                <h2>
                  Вагон: {flight?.flights.carrriages[index].carriageNumber}
                </h2>
                <button
                  onClick={() => {
                    const el =
                      flight?.flights?.carrriages[index + 1]?.carriageNumber;
                    if (el !== undefined) {
                      setSelectWagon(el);
                    } else {
                      setSelectWagon(
                        flight?.flights?.carrriages[0].carriageNumber
                      );
                    }
                  }}
                >
                  {" "}
                  ❯
                </button>
              </div>

              {item.type === "reserved" && <ReservedWagon data={item} />}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Flight;
