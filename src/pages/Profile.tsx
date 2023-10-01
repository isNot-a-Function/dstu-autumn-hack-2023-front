import React, { useState, useEffect } from "react";
import ProfileTop from "../components/Profile/ProfileTop";
import "../assets/scss/pages/_profile.scss";
import Inventory from "../components/Profile/Inventory";
import Details from "../components/Profile/Details";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../store";
import { access } from "fs";
import { UserData } from "../types/authTypes";

const Profile = () => {
  // const [logIn, { data: dataLogIn = null, error: errorLogIn }] = authApi.useLazySteamLoginQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<undefined | string>(undefined);
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      const openidparams = query.get("openid.identity");

      if (openidparams) {
        const openId = openidparams.replace(
          "https://steamcommunity.com/openid/id/",
          ""
        );
        if (openId !== undefined) {
          // logIn({ id: openId, body: query.toString() }).catch(() => navigate('/'));
        }
      } else {
        navigate("/");
      }
    } else {
      setToken(accessToken);
    }
  }, []);

  // useEffect(() => {
  //   if (errorLogIn) {
  //     navigate('/');
  //   } else {
  //     if (dataLogIn !== null) {
  //       const token: string | undefined = dataLogIn?.accessToken;
  //       const user: UserData | undefined = dataLogIn?.user;
  //       const refreshToken: string | undefined = dataLogIn?.refreshToken;
  //       if (token !== undefined && refreshToken != undefined) {
  //         localStorage.setItem('accessToken', token);
  //         localStorage.setItem('user', JSON.stringify(user));
  //         window.location.reload();
  //       } else {
  //         navigate('/');
  //       }
  //     }
  //   }
  // }, [dataLogIn, errorLogIn]);

  const [activeNav, setActiveNav] = useState(0);
  return token ? (
    <div>
      <ProfileTop activeNav={activeNav} setActiveNav={setActiveNav} />
      {activeNav === 0 ? <Inventory /> : <Details />}
    </div>
  ) : (
    <div>l</div>
  );
};

export default Profile;
