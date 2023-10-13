import React, { useState } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";

import { flightApi } from "../store";
import Loader from "../components/Loader";
import ReservedWagon from "../components/Main/ReservedWagon";

const Flight = () => {
  const flightId = window.location.pathname.replace("/flight/", "");
  const { data: flight, isLoading } = flightApi.useGetFlightQuery(flightId);
  const [isShowResponseModal, setIsShowResponseModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowDeclineOrder, setIsShowDeclineOrder] = useState(false);
  const [isShowDone, setIsShowDone] = useState(false);

  const user =
    localStorage.getItem("user") != null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  if (isLoading) return <Loader />;
  return (
    <div className="container box-deal-page ">
      <ReservedWagon />
    </div>
  );
};

export default Flight;
