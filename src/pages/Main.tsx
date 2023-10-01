import React, { useState, useEffect } from "react";
import { ReactComponent as Trash } from "../assets/img/trash.svg";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";

const Main = () => {
  const [activeSection, setActiveSection] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const sortList = [
    "ПО ДАТЕ СОЗДАНИЯ",
    "ПО РЕЙТИНГУ ЗАКАЗЧИКА",
    "ПО КОЛИЧЕСТВУ ОТКЛИКОВ",
    "ПО РАЗМЕРУ СТОИМОСТИ",
  ];
  const [value, setValue] = useState("");

  return (
    <div className="box-main-page container">
      <div>
        <SearchInput
          placeholder="Найти заказ"
          value={value}
          setValue={setValue}
        />
        <div className="box-list-sort">
          {sortList.map((sort: any, index: number) => {
            return (
              <div className="box-item-sort">
                <p>{sort}</p>
              </div>
            );
          })}
        </div>
        {String(activeSection)}
      </div>
      <Menu
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        openSection={openSection}
        setOpenSection={setOpenSection}
      />
    </div>
  );
};

export default Main;
