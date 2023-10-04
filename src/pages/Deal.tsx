import React, { useState } from "react";
import "../assets/scss/pages/_deal.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";
import { casesApi } from "../store";
import Loader from "../components/Loader";
import { getHours } from "../utils/getHours";
import CreateResponseModal from "../components/Main/CreateResponseModal";
import User from "../components/Main/User";

const Deal = () => {
  const orderId = window.location.pathname.replace("/order/", "");
  const { data: order, isLoading } = casesApi.useGetOrderQuery(orderId);
  const [isShowResponseModal, setIsShowResponseModal] = useState(false);
  const [archiveOrder] = casesApi.useArchiveOrderMutation();
  const [activeOrder] = casesApi.useActiveOrderMutation();

  const tags = [
    "Vue",
    "React",
    "NodeJS",
    "PHP",
    "Vue",
    "React",
    "NodeJS",
    "PHP",
    "Vue",
    "React",
    "NodeJS",
    "PHP",
  ];
  const user =
    localStorage.getItem("user") != null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;
  if (isLoading || order === undefined) return <Loader />;

  const checkMyCase = () => {
    return order.user.id === user?.id;
  };
  return (
    <div className="box-deal-page container">
      {isShowResponseModal && (
        <CreateResponseModal
          orderId={orderId}
          isActive={isShowResponseModal}
          setIsActive={setIsShowResponseModal}
        />
      )}
      <div className="body-deal-page">
        <div className="content-deal-page ">
          <h1 className="header-deal-page">{order?.order.title}</h1>
          <div className="box-list-tags">
            {order?.order.tags.map((tag) => (
              <p className="box-tags" key={tag}>
                {tag}
              </p>
            ))}
          </div>
          {order?.order.description && (
            <div className="description-deal-page">
              <p>Описание:</p>
              <p>{order?.order.description}</p>
            </div>
          )}
          {order?.order?.files?.length > 0 && (
            <div className="box-files">
              <p>Прикриплённые файлы:</p>
              {order?.order.files.map((item: any) => (
                <a href={item} download>
                  <div className="link-download">
                    <Download />
                    <p>{item}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
          <div className="box-price-deal">
            <p>
              Cтоимость:{" "}
              {order?.order.cost === null
                ? "договорная"
                : order?.order.costType === "inOrder"
                ? order.order.cost + "р за проект"
                : order?.order.cost + "р / в час"}
            </p>
          </div>
        </div>

        {checkMyCase() ? (
          order.responses.length > 0 && (
            <div className="box-responses">
              <p> Отклики:</p>
              {order.responses.map((it) => (
                <User
                  title={"Вася Пупкин"}
                  cost={5000}
                  costType={"inHour"}
                  text={it.comment}
                  rating={4.7}
                  isResponse={true}
                />
              ))}
            </div>
          )
        ) : (
          <button
            className="lightBtn btn"
            onClick={() => setIsShowResponseModal(true)}
          >
            Оставить отклик
          </button>
        )}

        <div className="item-response"></div>
      </div>

      <div className="box-dop-info">
        {checkMyCase() ? (
          <>
            <button
              className="lightBtn btn"
              onClick={() => setIsShowResponseModal(true)}
            >
              ИЗМЕНИТЬ ЗАКАЗ
            </button>

            <button
              className="lightBtn btn"
              onClick={() => {
                if (order.order.status === "active") {
                  archiveOrder({
                    orderId: orderId,
                  });
                } else {
                  activeOrder({
                    orderId: orderId,
                  });
                }
              }}
            >
              {order.order.status === "active"
                ? "ЗААРХИВИРОВАТЬ ЗАКАЗ"
                : "АКТИВИРОВАТЬ ЗАКАЗ"}
            </button>
          </>
        ) : (
          <div className="info-of-customer">
            <p> ЗАКАЗЧИК</p>
            <div className="box-avatar-in-deal">
              {!order.user.logo ? (
                <Avatar />
              ) : (
                <img src={order.user.logo} className="avatar-customer" />
              )}
              <p>
                {order.user.family
                  ? order.user.family + " " + order.user.name
                  : order.user.id}
              </p>
            </div>
            {order?.order.customer.rating == null && (
              <div className="box-rating">
                <ScaleOnline
                  rating={order?.order.customer.rating}
                  maxPlayers={5}
                />
              </div>
            )}
          </div>
        )}
        <div className="info-of-customer">
          <p>СПЕЦИАЛИЗАЦИЯ</p>
          <p>{order?.order.specialization.title}</p>
        </div>
        <div className="box-dop-info-mini">
          <div className="box-list-item-dop-info">
            <div className="item-dop-info">
              <Eye />
              <p>{order?.order.views} просмотров</p>
            </div>
            <div className="item-dop-info">
              <Speech />
              <p>{order?.order.responsesCount} откликов</p>
            </div>
            <div className="item-dop-info">
              <Time />
              <p>{getHours(order.order.createdAt)} ч назад</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
