import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_deal.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";
import Loader from "../components/Loader";
import { getHours } from "../utils/getHours";
import CreateResponseModal from "../components/Main/CreateResponseModal";
import User from "../components/Main/User";
import { userApi, casesApi } from "../store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  const { data: user } = userApi.useGetUserQuery(userLocal.id);
  const [changePhoto] = userApi.useChangePhotoMutation();
  const [checkFile] = casesApi.useCheckFileMutation();
  const [changeRole] = userApi.useChangeRoleMutation();
  const [isShowResponseModal, setIsShowResponseModal] = useState(false);
  const [archiveOrder] = casesApi.useArchiveOrderMutation();
  const [activeOrder] = casesApi.useActiveOrderMutation();

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    checkFile(formData).then((data: any) => {
      if (data?.data.files !== undefined) {
        changePhoto({ logo: data?.data.files[0] });
      }
    });
  };

  return (
    <div className="box-deal-page container">
      <div className="body-deal-page">
        <div className="content-deal-page "></div>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> ЛИЧНЫЙ КАБИНЕТ</p>
          <div className="box-avatar-in-deal">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                id="imgupload"
                onChange={handlerChangePhoto}
                style={{ display: "none", cursor: "pointer" }}
              />
              <label htmlFor="imgupload">
                {!user?.user.logo ? (
                  <Avatar style={{ cursor: "pointer" }} />
                ) : (
                  <img
                    src={user?.user.logo}
                    className="avatar-customer"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </label>
            </div>

            <p>
              {user?.user.family
                ? user.user.family + " " + user?.user.name
                : user?.user.id}
            </p>
          </div>

          <div className="box-rating">
            <ScaleOnline rating={4.5} maxPlayers={5} />
          </div>
        </div>

        <button className="lightBtn btn" onClick={() => changeRole()}>
          ПРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ{" "}
          {user?.user.role === "customer" ? "ИСПОЛНИТЕЛЯ" : "ЗАКАЗЧИКА"}
        </button>
        <div className="info-of-customer">
          <p>СПЕЦИАЛИЗАЦИЯ</p>
          <p>МОБИЛЬНОЕ ПРИЛОЖЕНИЕ</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
