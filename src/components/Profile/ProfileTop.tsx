import { useState } from "react";
import { ReactComponent as Steam } from "../../assets/img/profile/steam.svg";
import { ReactComponent as Exit } from "../../assets/img/profile/exit.svg";
import { useGetToken } from "../../hooks/useGetToken";
import { authApi } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import { useWindowSize } from "../../hooks/useWindowSize";
import ProfileTopItem from "./ProfileTopItem";
import avatar from "../../assets/img/default-avatar.svg";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useLang } from "../../hooks/useLang";
import {
  confirmationModalGetOutTitle,
  exitBtn,
  profilePageSelectDetailing,
  profilePageSelectInventory,
} from "../../consts/profile";

// const profileTopItem = [
//   useLang(profilePageSelectInventory),
//   useLang(profilePageSelectDetailing),
// ];

interface ProfileTopProps {
  activeNav: number;
  setActiveNav: (num: number) => void;
}

const ProfileTop = ({ activeNav, setActiveNav }: ProfileTopProps) => {
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  // const [logOut, {}] = authApi.useLazyLogOutQuery();
  const navigate = useNavigate();
  const dimensions = useWindowSize();
  const token = useGetToken();
  const user = getUser();

  const logOutHandler = () => setIsActiveConfirm(true);

  const logOutFunc = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <main className="profile-top">
        <div className="container profile-top-container">
          <img
            src={user?.avatar ? user.avatar : avatar}
            alt=""
            className="avatarInProfile"
          />
        </div>
      </main>
    </>
  );
};

export default ProfileTop;
