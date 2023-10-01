import React, { useEffect } from "react";
import "../assets/scss/components/_navbar.scss";
import { Link } from "react-router-dom";
import logo from "../assets/img/logotype-white.svg";
import { ReactComponent as CloseSidebar } from "../assets/img/navbarIcons/close.svg";
import { ReactComponent as Exit } from "../assets/img/navbarIcons/Login.svg";
import { useBodyScroll } from "../hooks/useBodyScroll";
import { authApi } from "../store";
import { getSettingsData } from "../types/customPageTypes";
import { useNavigate } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { exitBtn } from "../consts/profile";

interface SidebarProps {
  isActiveBurger: boolean;
  setIsActiveBurger: (param: boolean) => void;
  data: getSettingsData;
}

const MobileSidebar = ({
  isActiveBurger,
  setIsActiveBurger,
  data,
}: SidebarProps) => {
  // const [logOut, {}] = authApi.useLazyLogOutQuery();
  const navigate = useNavigate();
  useBodyScroll(isActiveBurger);
  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // logOut();
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <div className={`${isActiveBurger ? "blurBackgroundColor" : ""}`}></div>
      <div className={`${isActiveBurger ? "blurBackground" : ""}`}>{}</div>
      <div
        className={`sidebar ${
          isActiveBurger ? "sidebarActive" : "sidebarInactive"
        }`}
      >
        <div className="sidebarContainer">
          <div className="sidebarTop">
            <div className="sidebarLogoBlock">
              <CloseSidebar onClick={() => setIsActiveBurger(false)} />
              <Link
                onClick={() => setIsActiveBurger(false)}
                to="/store"
                className="sidebarLogoImg"
              >
                {/* <Logo /> */}
                <img src={logo} alt="" id="logoMobile" />
              </Link>
            </div>
            <nav className="sidebarNavbar">
              {data.panelURLs.top.sections.map((item) => (
                <Link
                  to={item.url}
                  className="sidebarNavbarItem"
                  onClick={() => setIsActiveBurger(false)}
                  key={item.id}
                >
                  <img src={item.icon} className="sidebarNavbarIcon" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="sidebarBottom">
            {localStorage.getItem("accessToken") && (
              <button
                className="btn exitBtnSidebar"
                onClick={() => logOutHandler()}
              >
                <Exit />
                <span>{useLang(exitBtn)}</span>
              </button>
            )}
            <div className="contactsMobile">
              {data.panelURLs.top.isShowContacts &&
                data.panelURLs.top.contacts.map((it: any) => (
                  <a
                    href={it.url}
                    target="_blank"
                    className="contacts_item"
                    key={it.id}
                    rel="noreferrer"
                  >
                    <img src={it.icon} className="icon-contact" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
