import React, { useState, useEffect } from "react";
import ProfileTop from "../components/Profile/ProfileTop";
import "../assets/scss/pages/_profile.scss";
import Inventory from "../components/Profile/Inventory";
import Details from "../components/Profile/Details";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../store";

const Profile = () => {
  // const [logIn, { data: dataLogIn = null, error: errorLogIn }] = authApi.useLazySteamLoginQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<undefined | string>(undefined);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      navigate("/login");
    } else {
      setToken(accessToken);
    }
  }, []);

  const [activeNav, setActiveNav] = useState(0);
  return token ? (
    <div className="container">
      <ProfileTop activeNav={activeNav} setActiveNav={setActiveNav} />
      {activeNav === 0 ? <Inventory /> : <Details />}
    </div>
  ) : (
    <div>l</div>
  );
};

export default Profile;
