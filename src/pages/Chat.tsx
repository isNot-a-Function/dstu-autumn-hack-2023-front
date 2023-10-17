import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_chat.scss";

const Chat = () => {
  return (
    <div className="container box-chat-page ">
      <div className="list-group">
        <h1>Cписок чатов</h1>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          (item) => (
            <div className="item-list-group">
              <p>Василий Пупкин</p>
            </div>
          )
        )}
      </div>
      <div className="box-chat">
        <div className="header-chat">
          <p>Вася Пупкин</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
