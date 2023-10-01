import React, { useState, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";
import { ReactComponent as Trash } from "../assets/img/trashSort.svg";

const Main = () => {
  const [activeSection, setActiveSection] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [directionSort, setDirectionSort] = useState("asc"); //asc - по возрастанию, desc - по убыванию
  const sortList = [
    {
      id: 1,
      label: "ПО ДАТЕ СОЗДАНИЯ",
      value: "1",
    },
    {
      id: 2,
      label: "ПО РЕЙТИНГУ ЗАКАЗЧИКА",
      value: "2",
    },
    {
      id: 3,
      label: "ПО КОЛИЧЕСТВУ ОТКЛИКОВ",
      value: "3",
    },
    {
      id: 4,
      label: "ПО РАЗМЕРУ СТОИМОСТИ",
      value: "4",
    },
  ];
  const [value, setValue] = useState("");

  const handlerClickSort = (value: string) => {
    if (sortValue === value) {
      setDirectionSort(directionSort === "asc" ? "desc" : "asc");
    } else {
      setSortValue(value);
    }
  };

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
              <button
                className={`${
                  sortValue === sort.value ? "box-active-item-sort" : ""
                } box-item-sort`}
                onClick={() => handlerClickSort(sort.value)}
                key={index}
              >
                <p>{sort.label}</p>
                {sortValue === sort.value && (
                  <p className="arrow-symbol">
                    {directionSort === "asc" ? "↑" : "↓"}
                  </p>
                )}
              </button>
            );
          })}
          {sortValue !== null && <Trash onClick={() => setSortValue(null)} />}
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
