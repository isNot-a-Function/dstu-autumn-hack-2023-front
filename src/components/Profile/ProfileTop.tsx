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
import ScaleOnline from "../Footer/ScaleOnline";

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
  // const user = getUser();

  const logOutHandler = () => setIsActiveConfirm(true);

  const logOutFunc = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const user = {
    id: "dfkldsklkfl;3-02493-",
    family: "Самодурова",
    name: "Валерия",
    avatar: null,
    rating: 4.8,
  };

  return (
    <>
      <div className="info-of-customer">
        <div className=" profile-top-container">
          <div className="box-avatar-in-deal">
            {user?.avatar != null ? (
              <img src={user?.avatar} className="avatar-customer" />
            ) : (
              <img src={avatar} className="avatar-customer" />
            )}
            <p>{user.family ? user.family + " " + user.name : user.id}</p>
            <div style={{ marginTop: 12, width: "100%", height: "100%" }}>
              <ScaleOnline rating={user.rating} maxPlayers={5} />
            </div>
          </div>
          <div className="box-rating-in-profile">
            <div className="switch-roles-box">
              <div className=" item-switch-role item-switch-role-active">
                Заказчик
              </div>
              <div className="item-switch-role">Исполнитель</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
