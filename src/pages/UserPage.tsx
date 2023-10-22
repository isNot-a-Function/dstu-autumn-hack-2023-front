import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";
import CreateResponseModal from "../components/Main/CreateResponseModal";
import { chatApi, flightApi, userApi } from "../store";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import UpdateProfileModal from "../components/Main/UpdateProfile";
import ChangeParametrsModal from "../components/Main/ChangeParametrsModal";
import DoneModal from "../components/Modals/DoneModal";
import Loader from "../components/Loader";

const sortListEx = [
  // {
  //   id: 1,
  //   label: "МОИ БИЛЕТЫ",
  //   value: "responses",
  // },
  // {
  //   id: 2,
  //   label: "В ПРОЦЕССЕ",
  //   value: "processed",
  // },
  // {
  //   id: 3,
  //   label: "ВЫПОЛНЕННЫЕ",
  //   value: "done",
  // },
];

const UserPage = () => {
  const userId = window.location.pathname
    .replace("/profile/", "")
    .replace("/responses/trainee/", "")
    .replace("/responses/practice/", "");
  const { data: user } = userApi.useGetProfileIdQuery(userId);

  console.log("userID", userId);

  const navigate = useNavigate();
  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  const [changePhoto] = userApi.useChangePhotoMutation();
  // const [checkFile] = casesApi.useCheckFileMutation();
  const [changeRole] = userApi.useChangeRoleMutation();
  const [page, setPage] = useState(1);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false);
  const [isShowChangeParametrs, setIsShowChangeParametrs] = useState(false);
  const [isShowRaitingModal, setIsShowRaitingModal] = useState(false);

  const [addRaiting] = flightApi.useAddRaitingMutation();

  const [createChat] = chatApi.useRequestConnectMutation();

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    // checkFile(formData).then((data: any) => {
    //   if (data?.data.files !== undefined) {
    //     changePhoto({ logo: data?.data.files[0] });
    //   }
    // });
  };
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  if (user?.user === undefined) return <Loader />;

  return (
    <div className="container box-profile-page ">
      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}></div>
        <div></div>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> СТРАНИЦА ПОЛЬЗОВАТЕЛЯ</p>
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
              <img src={user?.user?.logo} className="avatar-in-user-page" />
            </div>

            <p style={{ color: "white", marginTop: 10 }}>
              {user?.user?.fullname !== null
                ? user?.user?.fullname
                : "ID: " + user?.user.id}
            </p>
            {user?.user?.email && (
              <p style={{ color: "white", marginTop: 10 }}>
                {"EMAIL: " + user?.user?.email}
              </p>
            )}
            {user?.user?.tgLink && (
              <p style={{ color: "white", marginTop: 10 }}>
                {"TG: " + user?.user?.tgLink}
              </p>
            )}
            {user?.user?.vkLink && (
              <p style={{ color: "white", marginTop: 10 }}>
                {"VK: " + user.user.vkLink}
              </p>
            )}
          </div>
        </div>
        
        <button
          className="lightBtn btn"
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("dsfds");
            createChat({ userId: Number(userId) });
          }}
        >
          ЗАЯВКА НА ОБЩЕНИЕ
        </button>
        
        {/* <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowRaitingModal(true);
          }}
        >
          ПОСТАВИТЬ ОЦЕНКУ
        </button> */}
      </div>
    </div>
  );
};

export default UserPage;
