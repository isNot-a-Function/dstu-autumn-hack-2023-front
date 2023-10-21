import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_flight.scss";
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
import { userApi } from "../store";
import { useNavigate } from "react-router-dom";
import Case from "../components/Main/Case";
import Pagination from "../components/Pagination/Pagination";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import UpdateProfileModal from "../components/Main/UpdateProfile";
import { flightApi } from "../store";
import TrainCard from "../components/Main/Case";
import ChangeParametrsModal from "../components/Main/ChangeParametrsModal";

const sortListEx = [
  {
    id: 1,
    label: "МОИ ОТКЛИКИ",
    value: "responses",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { data: tasks } = flightApi.useGetMyTaskQuery();

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

  const { data: user } = userApi.useGetUserQuery();
  const [changePhoto] = userApi.useChangePhotoMutation();
  // const [checkFile] = casesApi.useCheckFileMutation();
  const [sortValue, setSortValue] = useState<string>(sortListEx[0].value);
  const [page, setPage] = useState(1);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false);
  const [isShowChangeParametrs, setIsShowChangeParametrs] = useState(false);

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    // checkFile(formData).then((data: any) => {
    //   if (data?.data.files !== undefined) {
    //     changePhoto({ logo: data?.data.files[0] });
    //   }
    // });
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container box-profile-page ">
      {isShowConfirmationModal && (
        <ConfirmationModal
          setIsActive={setIsShowConfirmationModal}
          modalTitle="Вы действительно хотите выйти?"
          func={logOut}
        />
      )}

      {isShowUpdateUserModal && (
        <UpdateProfileModal
          isActive={isShowConfirmationModal}
          setIsActive={setIsShowUpdateUserModal}
        />
      )}

      {isShowChangeParametrs && (
        <ChangeParametrsModal
          isActive={isShowChangeParametrs}
          setIsActive={setIsShowChangeParametrs}
        />
      )}

      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}>
          <div className="box-list-sort">
            {sortListEx.map((sort: any, index: number) => {
              return (
                <button
                  className={`${
                    sortValue === sort.value ? "box-active-item-sort" : ""
                  } box-item-sort`}
                  onClick={() => setSortValue(sort.value)}
                  key={index}
                >
                  <p>{sort.label}</p>
                  {/* {sortValue === sort.value && (
                    <p className="arrow-symbol">
                      {directionSort === "asc" ? "↑" : "↓"}
                    </p>
                  )} */}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="box-list-cases">
            {/* {tickets?.tickets?.map((item: any) => {
              return (
                <TrainCard
                  data={item?.flightPlace?.flight}
                  isHaveTicket={true}
                  place={item?.flightPlace?.place}
                  cost={item?.flightPlace?.cost}
                />
              );
            })} */}
          </div>
        </div>
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
            ></div>

            <p style={{ color: "white", textDecoration: "uppercase" }}>
              {user?.user.fullname ? user.user.fullname : user?.user.id}
            </p>
          </div>
        </div>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowUpdateUserModal(true);
          }}
        >
          ИЗМЕНИТЬ ПРОФИЛЬ
        </button>

        <button
          className="blackBtn btn"
          onClick={() => {
            setIsShowConfirmationModal(true);
          }}
        >
          ВЫЙТИ
        </button>
      </div>
    </div>
  );
};

export default Profile;
