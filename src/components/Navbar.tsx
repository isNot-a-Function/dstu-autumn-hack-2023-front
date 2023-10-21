import React, { useEffect, useState } from "react";
import "../assets/scss/components/_navbar.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/img/logoBig.svg";
import { ReactComponent as Plus } from "../assets/img/Plus.svg";
import { ReactComponent as BurgerMenu } from "../assets/img/navbarIcons/burger_menu.svg";
import { useGetToken } from "../hooks/useGetToken";
import { useWindowSize } from "../hooks/useWindowSize";
import { userApi } from "../store";
import avatar from "../assets/img/default-avatar.svg";
import TopUpModal from "./Modals/TopUpModal";
import { ReactComponent as Burger } from "../assets/img/navbarIcons/burger_menu.svg";

import Train from "./Train";
const Navbar = () => {
  const token = useGetToken();
  // const user = getUser();
  // const [getBalance, { data: userBalace }] = userApi.useLazyGetBalanceQuery();
  const [activeNavbarItem, setActiveNavbarItem] = useState(0);
  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  const [getUser, { data: user }] = userApi.useLazyGetUserQuery();

  const dimensions = useWindowSize();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== undefined &&
      localStorage.getItem("accessToken") !== null
    ) {
      getUser(userLocal?.id);
    }
  }, []);

  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);

  const sections = [
    {
      id: 1,
      name: "СТАЖЁРАМ",
      url: "/trainee",
    },
    {
      id: 2,
      name: "ПРАКТИКАНТАМ",
      url: "/practice",
    },
    {
      id: 3,
      name: "ЧАТЫ",
      url: "/chat",
    },
  ];

  const section_hr = [
    {
      id: 1,
      name: "СТАЖЁРЫ",
      url: "responses/trainee",
    },
    {
      id: 2,
      name: "ПРАКТИКАНТЫ",
      url: "responses/practice",
    },
    {
      id: 3,
      name: "ЧАТЫ",
      url: "/chat",
    },
  ];

  return (
    <>
      <div className="header-plug" />
      <div className="header">
        <div className="container">
          <div className="header_inner">
            <Link
              to="/store"
              className="logo_img"
              onClick={() => setActiveNavbarItem(0)}
            >
              {dimensions.width < 1000 ? (
                <></>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    marginTop: -30,
                  }}
                >
                  <Logo />
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      marginTop: -75,
                    }}
                  >
                    {userLocal?.role == "hr"
                      ? "ДЛЯ HR"
                      : "ДЛЯ СТАЖЁРОВ И ПРАКТИКАНТОВ"}
                  </p>

                  {/* В<div className="train-logo"></div>
                  <span style={{ color: "#ff0000" }}>ПУТЬ</span> */}
                </div>
              )}
            </Link>

            <nav className="navbar">
              {(userLocal?.role == "hr" ? section_hr : sections).map(
                (item, index) => (
                  <Link
                    to={item.url}
                    className={`${
                      activeNavbarItem === index + 1
                        ? "navbar__itemActive"
                        : "navbar__item"
                    }`}
                    key={item.id}
                    onClick={() => setActiveNavbarItem(index + 1)}
                  >
                    {/* <img src={item.icon} className="navbar__icon" /> */}
                    <span>{item.name}</span>
                  </Link>
                )
              )}
            </nav>

            {/* {dimensions.width >= 1200 && (
              <div className="contacts">
                {navbar?.panelURLs.top.isShowContacts &&
                  navbar?.panelURLs.top.contacts.map((it) => (
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
            )} */}

            {isActiveModal && <TopUpModal setIsActive={setIsActiveModal} />}

            {token !== null ? (
              <div className="profile">
                {/* <div className="balanse" onClick={() => setIsActiveModal(true)}>
                  <span>{user?.user?.balance} ₽</span>
                  <Plus />
                </div> */}
                <Link
                  to="/profile"
                  className="profile__icon"
                  onClick={() => setActiveNavbarItem(0)}
                >
                  <img
                    alt=""
                    src={user?.user.logo}
                    className="avatar-in-navbar"
                  />

                  {/* <div className="lvlIconBlock">
                    <div className="lvlIcon">
                      <LvlIcon />
                      <span className="lvlTitle">{7}</span>
                    </div>
                  </div> */}
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="profile"
                style={{ cursor: "pointer", color: "white" }}
              >
                ВОЙТИ
                {/* <div className="lvlIconBlock">
                <div className="lvlIcon">
                  <LvlIcon />
                  <span className="lvlTitle">{7}</span>
                </div>
              </div> */}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
