import React, { useState, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";
import { ReactComponent as Trash } from "../assets/img/trashSort.svg";
import TrainCard from "../components/Main/Case";
import { flightApi } from "../store";
import Pagination from "../components/Pagination/Pagination";
import CreateCaseModal from "../components/Main/CreateCaseModal";
import ReactDatePicker from "react-datepicker";
import CustomSelect from "../components/UI/CustomSelect";
import img1 from "../assets/img/main/3.png";
import img2 from "../assets/img/main/21.png";
import img3 from "../assets/img/main/2.png";

const cityes = [
  {
    value: "Москва",
    label: "Москва",
  },
  {
    value: "Нижний Новгород",
    label: "Нижний Новгород",
  },
  {
    value: "СПБ",
    label: "СПБ",
  },
  {
    value: "Казань",
    label: "Казань",
  },
  {
    value: "Мурманск",
    label: "Мурманск",
  },
];

const Main = () => {
  const [activeSection, setActiveSection] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [directionSort, setDirectionSort] = useState("asc"); //asc - по возрастанию, desc - по убыванию
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);

  const [selectCity1, setSelectCity1] = useState(cityes[0]);
  const [selectCity2, setSelectCity2] = useState(cityes[3]);

  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [value, setValue] = useState("");

  const { data: flights } = flightApi.useGetFlightsQuery({
    place1: selectCity2.value,
    place2: selectCity1.value,
    date: dateValue.toLocaleDateString(),
  });

  useEffect(() => {
    console.log("flights", flights);
  }, [flights]);

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

  const handlerClickSort = (value: string) => {
    if (sortValue === value) {
      setDirectionSort(directionSort === "asc" ? "desc" : "asc");
    } else {
      setSortValue(value);
    }
  };

  return (
    <div className="box-main-page container">
      <div className="section-1">
        <div className="text-section-1">
          <h1>ПРИЛОЖЕНИЕ ДЛЯ ОТБОРА СТАЖЁРОВ</h1>
          <h1>И ПРАКТИКАНТОВ</h1>
          <div className="dop-info-1">
            <p>КОТОРОЕ ДЕЛАЕТ ПРОЦЕСС ПРОСТЫМ И ПОНЯТНЫМ</p>
            <p>ДЛЯ КАНДИДАТОВ И HR</p>
          </div>
          <button className="btn lightBtn">ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </div>

        <img src={img1} className="img-main-1" />
      </div>

      <div className="section-2">
        <img src={img2} className="img-main-2" />
        <div className="text-section-2">
          <h1>ПРИХОДИ НА СТАЖИРОВКУ</h1>
          <h1>В ЦЕНТР-ИНВЕСТ</h1>
          <div className="dop-info-2">
            <p>ВЕДЬ МЫ:</p>
            <p>БЕРЁМ БЕЗ ОПЫТА И ОБУЧАЕМ</p>
            <p>ПРЕДОСТАВЛЯЕМ ГИБКИЙ ГРАФИК СТАЖИРОВКИ</p>
            <p>ПРЕДОСТАВЛЯЕМ ВЫСОКУЮ ЗАРПЛАТУ И ПОЛНЫЙ СОЦИАЛЬНЫЙ ПАКЕТ</p>
          </div>
          <button className="btn blackBtn">CТАТЬ СТАЖЁРОМ</button>
        </div>
      </div>

      <div className="section-3">
        <div className="text-section-3">
          <h1>ЦЕНТР-ИНВЕСТ</h1>
          <h1>ПРИГЛАШАЕТ ТЕБЯ НА</h1>
          <h1>ПРАКТИКУ</h1>
          <button className="btn lightBtn">CТАТЬ ПРАКТИКАНТОМ</button>
        </div>
        <img src={img3} className="img-main-3" />
        <div className="dop-info-3">
          <p>СМОЖЕШЬ ПОПРОБОВАТЬ СЕБЯ В РАЗНЫХ ОТДЕЛАХ</p>
          <p>БУДЕШЬ ИМЕТЬ ВОЗМОЖНОСТЬ КАРЬЕРНОГО РОСТА</p>
          <p>У НАС 11 КОМФОРТНЫХ ОФИСОВ В 7 РЕГИОНАХ</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
