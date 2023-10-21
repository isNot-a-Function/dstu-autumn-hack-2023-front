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
import CreateQuestionsTest1 from "../components/Main/CreateQuestionsTest1";
import CreateQuestionsTestMulti from "../components/Main/CreateQuestionsDescription";

const CreateQuestions = () => {
  //   const userId = window.location.pathname.replace("/profile/", "");
  //   const { data: user } = userApi.useGetProfileIdQuery(userId);
  //   console.log("userID", userId);

  const navigate = useNavigate();
  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  const [isShowCreateQuestionsTest1, setIsShowCreateQuestionsTest1] =
    useState(false);
  const [isShowCreateQuestionsTestMulti, setIsShowCreateQuestionsTestMulti] =
    useState(false);

  const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false);
  const [isShowChangeParametrs, setIsShowChangeParametrs] = useState(false);
  const [isShowRaitingModal, setIsShowRaitingModal] = useState(false);

  const [addRaiting] = flightApi.useAddRaitingMutation();

  const [createChat] = chatApi.useRequestChatMutation();

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // if (tickets === undefined) return <Loader />;

  return (
    <div className="container box-profile-page ">
      {/* {isShowConfirmationModal && (
        <ConfirmationModal
          setIsActive={setIsShowConfirmationModal}
          modalTitle="Вы действительно хотите выйти?"
          func={logOut}
        />
      )} */}

      {/* {isShowUpdateUserModal && (
        <UpdateProfileModal
          isActive={isShowConfirmationModal}
          setIsActive={setIsShowUpdateUserModal}
        />
      )} */}

      {isShowChangeParametrs && (
        <ChangeParametrsModal
          isActive={isShowChangeParametrs}
          setIsActive={setIsShowChangeParametrs}
        />
      )}

      {isShowCreateQuestionsTest1 && (
        <CreateQuestionsTest1
          isActive={isShowCreateQuestionsTest1}
          setIsActive={setIsShowCreateQuestionsTest1}
        />
      )}

      {isShowCreateQuestionsTestMulti && (
        <CreateQuestionsTestMulti
          isActive={isShowCreateQuestionsTestMulti}
          setIsActive={setIsShowCreateQuestionsTestMulti}
        />
      )}

      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}></div>
        <div></div>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> КОНСТРУКТОР ТЕСТОВ</p>
        </div>

        <button className="lightBtn btn" onClick={() => {}}>
          СОЗДАТЬ ТЕСТ
        </button>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowCreateQuestionsTest1(true);
          }}
        >
          CОЗДАТЬ ТЕСТОВЫЙ ВОПРОС С ОДНИМ ВАРИАНТОМ ОТВЕТА
        </button>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowCreateQuestionsTestMulti(true);
          }}
        >
          CОЗДАТЬ ТЕСТОВЫЙ ВОПРОС С НЕСКОЛЬКИМИ ВАРИАНТАМИ ОТВЕТА
        </button>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowRaitingModal(true);
          }}
        >
          CОЗДАТЬ ВОПРОС С РАЗВЁРНУТОМ ОТВЕТОМ
        </button>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowRaitingModal(true);
          }}
        >
          CОЗДАТЬ ВОПРОС С КОДОМ
        </button>
      </div>
    </div>
  );
};

export default CreateQuestions;
