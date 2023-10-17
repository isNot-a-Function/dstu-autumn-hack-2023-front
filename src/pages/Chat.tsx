import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_chat.scss";
import { chatApi } from "../store";
import Loader from "../components/Loader";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { data: chats } = chatApi.useGetGroupsQuery();
  const [selectGroup, setSelectGroup] = useState(-1);
  console.log("chats", chats);

  if (chats === undefined) return <Loader />;
  return (
    <div className="container box-chat-page ">
      <div className="list-group">
        <h1>Cписок чатов</h1>
        {chats.groups.map((item: any) => (
          <div className="item-list-group">
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="box-chat">
        <div className="header-chat">
          <p>Вася Пупкин</p>
        </div>
        <div className="box-messages">
          <div className="item-message my-message">
            <p>
              Привет! Я твой сосед в купе, на позде 208С, как насчёт того, чтобы
              поиграть в настольные игры?
            </p>
            <p>12.03.2023 15:40</p>
          </div>

          <div className="item-message nomy-message">
            <p>Привет! Я только за! Во что будет играть?</p>
            <p>12.03.2023 16:40</p>
          </div>
        </div>
        <div className="send-messages">
          <input
            className="input-chat"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button className="lightBtn">Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
