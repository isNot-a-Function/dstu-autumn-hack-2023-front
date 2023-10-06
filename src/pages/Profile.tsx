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
import Case from "../components/Main/Case";
import Pagination from "../components/Pagination/Pagination";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import UpdateProfileModal from "../components/Main/UpdateProfile";

const sortListEx = [
  {
    id: 1,
    label: "ОТКЛИКИ",
    value: "responses",
  },
  {
    id: 2,
    label: "В ПРОЦЕССЕ",
    value: "processed",
  },
  {
    id: 3,
    label: "ВЫПОЛНЕННЫЕ",
    value: "done",
  },
];
const sortListCustomer = [
  {
    id: 1,
    label: "АКТИВНЫЕ",
    value: "active",
  },
  {
    id: 2,
    label: "В ПРОЦЕССЕ",
    value: "processed",
  },
  {
    id: 5,
    label: "НА ПРОВЕРКЕ",
    value: "checked",
  },
  {
    id: 3,
    label: "ВЫПОЛНЕННЫЕ",
    value: "done",
  },
  {
    id: 4,
    label: "АРХИВИРОВАННЫЕ",
    value: "archived",
  },
];
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

  const { data: user } = userApi.useGetUserQuery();
  const [changePhoto] = userApi.useChangePhotoMutation();
  const [checkFile] = casesApi.useCheckFileMutation();
  const [sortValue, setSortValue] = useState<string>(
    (user?.user.role === "customer" ? sortListCustomer : sortListEx)[0].value
  );
  const [changeRole] = userApi.useChangeRoleMutation();
  const [page, setPage] = useState(1);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false);

  const { data: orders } = casesApi.useGetMyOrdersQuery({
    filter: sortValue,
    page: page,
  });

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    checkFile(formData).then((data: any) => {
      if (data?.data.files !== undefined) {
        changePhoto({ logo: data?.data.files[0] });
      }
    });
  };
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const getRating = () => {
    return user?.user.role === "customer"
      ? user?.user.custoremInfo.rating
      : user?.user.executorInfo.rating;
  };

  return (
    <div className="container box-deal-page ">
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

      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}>
          <div className="box-list-sort">
            {(user?.user.role === "customer"
              ? sortListCustomer
              : sortListEx
            ).map((sort: any, index: number) => {
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
            {orders?.orders.map((order: any) => (
              <Case
                key={order.id}
                id={order.id}
                title={order.title}
                createdAt={order.createdAt}
                views={order.views}
                cost={order.cost}
                costType={order.costType}
                responsesCount={order.responsesCount}
                tags={order.tags}
              />
            ))}
          </div>
          {orders?.orders?.length !== 0 ? (
            <Pagination
              currentPage={page}
              setCurrentPage={setPage}
              pagesAmount={orders?.count || 1}
              perPage={15}
            />
          ) : (
            <h1>Список пуст</h1>
          )}
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
            {getRating() !== 0 ? (
              <ScaleOnline
                //@ts-ignore
                rating={
                  user?.user.role === "customer"
                    ? user?.user.custoremInfo.rating
                    : user?.user.executorInfo.rating
                }
                maxPlayers={5}
              />
            ) : (
              <p>У вас пока нет оценок</p>
            )}
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
          className="lightBtn btn"
          onClick={() => {
            changeRole().then((data: any) => {
              const token = data?.data.token;
              if (token != undefined) {
                localStorage.setItem("accessToken", token);
              }
            });
          }}
        >
          ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ{" "}
          {user?.user.role === "customer" ? "ИСПОЛНИТЕЛЯ" : "ЗАКАЗЧИКА"}
        </button>
        {/* {user?.user.role !== "customer" && (
          <div className="info-of-customer">
            <p>СПЕЦИАЛИЗАЦИЯ</p>
            <p>МОБИЛЬНОЕ ПРИЛОЖЕНИЕ</p>
          </div>
        )} */}
        <button
          className="bezBtn btn"
          onClick={() => {
            navigate("/balance");
          }}
        >
          ИСТОРИЯ БАЛАНСА
        </button>
        <button
          className="lightBtn btn"
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
