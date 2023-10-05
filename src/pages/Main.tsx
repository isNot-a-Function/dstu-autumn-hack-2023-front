import React, { useState, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";
import { ReactComponent as Trash } from "../assets/img/trashSort.svg";
import Case from "../components/Main/Case";
import { casesApi } from "../store";
import Pagination from "../components/Pagination/Pagination";
import CreateCaseModal from "../components/Main/CreateCaseModal";

const Main = () => {
  const [activeSection, setActiveSection] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [directionSort, setDirectionSort] = useState("asc"); //asc - по возрастанию, desc - по убыванию
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const { data: orders } = casesApi.useGetOrdersQuery(page);
  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);
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
      {isShowModal && (
        <CreateCaseModal isActive={isShowModal} setIsActive={setIsShowModal} />
      )}
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
        <div className="box-list-cases">
          {orders?.orders.map((order: any) => (
            <Case
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
      <div style={{ paddingRight: 12, top: 80 }}>
        <button className="lightBtn btn" onClick={() => setIsShowModal(true)}>
          СОЗДАТЬ ЗАКАЗ
        </button>
        <Menu
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
      </div>
    </div>
  );
};

export default Main;
