import React, { useState, useEffect } from "react";
import "../../../assets/scss/components/modals/_top-up-modal.scss";
import ruble from "../../../assets/img/Ruble.svg";
import { useBodyScrollModal } from "../../../hooks/useBodyScrollModal";
import Input from "../../UI/Input";
import TopUpItem from "./TopUpItem";
import svg from "../../../assets/img/SBP.svg";
import ProgressBar from "../ProgressBar";
import BottomSide from "./BottomSide";
import { userApi } from "../../../store";
import Modal from "../../UI/Modal";

interface TopUpModalProps {
  setIsActive: (param: boolean) => void;
}

const item = [
  {
    count: 50,
    procent: 15,
  },
  {
    count: 150,
    procent: 15,
  },
  {
    count: 500,
    procent: 15,
  },
  {
    count: 750,
    procent: 15,
  },
];

const data = [
  {
    img: svg,
    topTitle: "Gamemoney",
    bottomTitle: "Банковская карта",
    percentages: 12,
  },
  {
    img: svg,
    topTitle: "Gamemoney",
    bottomTitle: "Банковская карта",
    percentages: 18,
  },
  {
    img: svg,
    topTitle: "Gamemoney",
    bottomTitle: "Банковская карта",
    percentages: 15,
  },
  {
    img: svg,
    topTitle: "Gamemoney",
    bottomTitle: "Банковская карта",
    percentages: 16,
  },
  {
    img: svg,
    topTitle: "Gamemoney",
    bottomTitle: "Банковская карта",
    percentages: 8,
  },
];

const selectItems = ["Все", "Деньги", "Скины", "Крипта"];

const TopUpModal = ({ setIsActive }: TopUpModalProps) => {
  // const [refillFunc] = userApi.useRefillMutation();
  const [addBalance] = userApi.useAddBalanceMutation();
  const [activeSelect, setActiveSelect] = useState(0);
  const [amountInput, setAmountInput] = useState("");

  useBodyScrollModal();

  const [id, setId] = useState<number | null>(
    localStorage.getItem("activeServer") != null
      ? Number(localStorage.getItem("activeServer"))
      : null
  );

  useEffect(() => {
    localStorage.setItem("activeServer", JSON.stringify(id));
  }, [id]);

  const handlerButton = async () => {
    if (amountInput && +amountInput > 0) {
      await addBalance({ sum: +amountInput });
      setIsActive(false);
    }
  };
  return (
    <Modal
      headerTitle={"Пополнение средств"}
      setIsActive={setIsActive}
      isSelect
      modalHeaderBottom={20}
      className="topUp"
      isTopUp
    >
      <>
        {/* нужный кусок
        <div className="select">
              {selectItems.map((el, index) => (
                <div
                  onClick={() => setActiveSelect(index)}
                  className={`selectItem ${activeSelect === index ? 'selectItemActive' : ''}`}
                  key={index}
                >
                  {el}
                </div>
              ))}
            </div> */}
        {/* <div className="payments">
          {[...data, ...data].map((el, index) => (
            <TopUpItem
              setCurrentPercentages={setCurrentPercentages}
              activePayments={activePayments}
              setActivePayments={setActivePayments}
              index={index}
              {...el}
              key={index}
            />
          ))}
        </div> */}
        <div>
          <div className="canBeTranslatedInputItem inputBlock">
            <h4 className="mb12">{}</h4>
            <Input
              svgIcon={ruble}
              isNumber
              value={amountInput}
              setValue={setAmountInput}
              placeholder={""}
            />
          </div>

          <button onClick={handlerButton} className="btn lightBtn wideBtn">
            Пополнить
          </button>
        </div>
      </>
    </Modal>
  );
};

export default TopUpModal;
