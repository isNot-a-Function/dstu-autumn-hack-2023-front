import React, { useState, useEffect } from 'react';
import '../../../../assets/scss/components/shop/modals/top-up/_top-up-modal.scss';
import ruble from '../../../../assets/img/Ruble.svg';
import { ReactComponent as CloseIcon } from '../../../../assets/img/modal/CloseIcon.svg';
import { useBodyScrollModal } from '../../../../hooks/useBodyScrollModal';
import Input from '../../../UI/Input';
import TopUpItem from './TopUpItem';
import svg from '../../../../assets/img/SBP.svg';
import ProgressBar from '../../../Modals/ProgressBar';
import BottomSide from './BottomSide';
import { RefillProps } from '../../../../types/userTypes';
import { userApi } from '../../../../store';
import Modal from '../../../UI/Modal';
import { useLang } from '../../../../hooks/useLang';
import {
  topUpModalEnterTheAmount,
  topUpModalInputAmount,
  topUpModalTitle,
  topUpModalTopUpBtn,
} from '../../../../consts/modal';

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
    topTitle: 'Gamemoney',
    bottomTitle: 'Банковская карта',
    percentages: 12,
  },
  {
    img: svg,
    topTitle: 'Gamemoney',
    bottomTitle: 'Банковская карта',
    percentages: 18,
  },
  {
    img: svg,
    topTitle: 'Gamemoney',
    bottomTitle: 'Банковская карта',
    percentages: 15,
  },
  {
    img: svg,
    topTitle: 'Gamemoney',
    bottomTitle: 'Банковская карта',
    percentages: 16,
  },
  {
    img: svg,
    topTitle: 'Gamemoney',
    bottomTitle: 'Банковская карта',
    percentages: 8,
  },
];

const selectItems = ['Все', 'Деньги', 'Скины', 'Крипта'];

const TopUpModal = ({ setIsActive }: TopUpModalProps) => {
  const [refillFunc] = userApi.useRefillMutation();

  const [activeSelect, setActiveSelect] = useState(0);
  const [amountInput, setAmountInput] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [activePayments, setActivePayments] = useState(0);
  const [currentPercentages, setCurrentPercentages] = useState(0);

  useBodyScrollModal();

  const [id, setId] = useState<number | null>(
    localStorage.getItem('activeServer') != null ? Number(localStorage.getItem('activeServer')) : null,
  );

  useEffect(() => {
    localStorage.setItem('activeServer', JSON.stringify(id));
  }, [id]);

  const handlerButton = async () => {
    if (amountInput && +amountInput > 0) {
      await refillFunc(+amountInput).unwrap();
      setIsActive(false);
    }
  };
  return (
    <Modal
      headerTitle={useLang(topUpModalTitle)}
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
        <div className="payments">
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
        </div>
        <div>
          <div className="canBeTranslatedInputItem inputBlock">
            <h4 className="mb12">{useLang(topUpModalEnterTheAmount)}</h4>
            <Input
              svgIcon={ruble}
              isNumber
              value={amountInput}
              setValue={setAmountInput}
              placeholder={useLang(topUpModalInputAmount)}
            />
          </div>
          <div className="progressBar">
            <ProgressBar item={item} activeValue={amountInput} />
          </div>
          {/* нужный кусок
           <div className="canBeTranslatedInputItem inputBlock mobile-dn">
              <div className="flex jc mb12">
                <h4>Промокод</h4>
                <div className="flex">
                  <h4>Бонус</h4>
                  <div className="bonus">
                    <div>+ 0%</div>
                  </div>
                </div>
              </div> */}
          {/* нужный кусок 
          <div className="promo">
              <Input svgIcon={ruble} value={promoInput} setValue={setPromoInput} placeholder="Введите промокод" />
              <button className="btn blackBtn wideBtn">Применить</button>
            </div> */}
          <BottomSide amountInput={amountInput} percentages={currentPercentages} />
          <button onClick={handlerButton} className="btn greenBtn wideBtn">
            {useLang(topUpModalTopUpBtn)}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default TopUpModal;
