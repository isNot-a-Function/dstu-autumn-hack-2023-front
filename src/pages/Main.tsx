import React, { useState, useEffect } from "react";
import { ReactComponent as Trash } from "../assets/img/trash.svg";

const Main = () => {
  const [activeSection, setActiveSection] = useState<number[]>([]);

  const sectionList = ["РАЗРАБОТКА", "ДИЗАЙН", "МАРКЕТИНГ", "РАЗНОЕ"];

  const sortList = [
    "ПО ДАТЕ СОЗДАНИЯ",
    "ПО РЕЙТИНГУ ЗАКАЗЧИКА",
    "ПО КОЛИЧЕСТВУ ОТКЛИКОВ",
    "ПО РАЗМЕРУ СТОИМОСТИ",
  ];

  const handlerClickSection = (index: number) => {
    if (activeSection.includes(index)) {
      setActiveSection(activeSection.filter((item) => item !== index));
    } else {
      setActiveSection([...activeSection, index]);
    }
  };

  return (
    <div className="box-main-page">
      <div>
        <></>
      </div>
      <div className="list-filter">
        <div className="header-box-filter">
          <h1>CФЕРЫ</h1>
          {activeSection.length !== 0 && (
            <p
              onClick={() => {
                setActiveSection([]);
              }}
            >
              <Trash />
            </p>
          )}
        </div>

        {sectionList.map((section, index) => {
          return (
            <p
              onClick={() => handlerClickSection(index)}
              className={`${
                activeSection.includes(index)
                  ? "active-section-list-filter"
                  : "section-list-filter"
              }`}
            >
              {section}
              {activeSection.includes(index) ? " ×" : ""}
            </p>
          );
        })}
        <div className="header-box-filter">
          <h1>ОТСОРТИРОВАТЬ</h1>
          {activeSection.length !== 0 && (
            <p
              onClick={() => {
                setActiveSection([]);
              }}
            >
              <Trash />
            </p>
          )}
        </div>
        {sortList.map((section, index) => {
          return (
            <p
              onClick={() => handlerClickSection(index)}
              className={`${
                activeSection.includes(index)
                  ? "active-section-list-filter"
                  : "section-list-filter"
              }`}
            >
              {section}
              {activeSection.includes(index) ? " ×" : ""}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
