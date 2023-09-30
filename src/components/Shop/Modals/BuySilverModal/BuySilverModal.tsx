import React, { useEffect, useState } from 'react';
import Modal from '../../../UI/Modal';
import SilverPackage from './SilverPackage';
import { ReactComponent as Equals } from '../../../../assets/img/buySilver/equals.svg';
import { ReactComponent as Rub } from '../../../../assets/img/Ruble.svg';
import { ReactComponent as Silver } from '../../../../assets/img/buySilver/silver.svg';
import { buyProductParams, getPriceCurrencyParams } from '../../../../types/userTypes';
import { getShopItem } from '../../../../types/rustTypes';
import { useBodyScrollModal } from '../../../../hooks/useBodyScrollModal';
import { getPriceCurrencyData } from '../../../../types/userTypes';
import { useLang } from '../../../../hooks/useLang';
import {
  modalBuy,
  silverModalEnterTheAmount,
  silverModalInCoins,
  silverModalInRubles,
  silverModalSelectAPackage,
  silverModalSubTitle,
  silverModalTitle,
} from '../../../../consts/modal';

export interface BuySilverModalProps {
  setIsActive: (param: boolean) => void;
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: (body: any) => void;
  getPriceData: getPriceCurrencyData | undefined;
}
const BuySilverModal = ({ setIsActive, item, buy, getPrice, getPriceData }: BuySilverModalProps) => {
  useBodyScrollModal();
  const [rubInput, setRubInput] = useState('');
  const [coinInput, setCoinInput] = useState('');
  const [selectedPack, setSelectedPack] = useState(undefined);

  const [selectedServer, setSelectedServer] = useState(0);

  const handlerButton = () => {
    buy({
      productId: item.id,
      amount: Number(coinInput),
      serverId: Number(selectedServer),
      isPack: selectedPack ? true : false,
    });
    setRubInput('');
    setCoinInput('');
    setIsActive(false);
  };
  const checkSilver = (value: any) => {
    if (!value.match(/\D/g) && +value.length < 8) {
      setRubInput(value);
      getPrice({ id: item.id, rubs: Number(value), isPack: selectedPack ? true : false });
      if (!value) {
        setCoinInput(value);
      }
    }
  };

  const handlerRubsInput = (value: any) => {
    setSelectedPack(undefined);
    checkSilver(value);
  };

  const handlerSilverInput = (value: any) => {
    setSelectedPack(undefined);
    checkRubs(value);
  };

  const handlerChangePackage = (item: any) => {
    checkRubs(item.count);
    setSelectedPack(item.id);
  };

  const checkRubs = (val: any) => {
    const value = String(val);
    if (!value.match(/\D/g) && +value.length < 8) {
      setCoinInput(value);
      getPrice({ id: item.id, amount: Number(value), isPack: selectedPack ? true : false });
      if (!value) {
        setRubInput(value);
      }
    }
  };

  useEffect(() => {
    if (getPriceData?.type === 'currency') {
      setCoinInput(String(getPriceData?.amount));
    }
    if (getPriceData?.type === 'money') {
      setRubInput(String(getPriceData?.finalPrice));
    }
  }, [getPriceData]);

  useEffect(() => {
    setCoinInput('');
    setRubInput('');
  }, []);

  return (
    <Modal
      modalHeaderBottom={20}
      headerTitle={useLang(silverModalTitle)}
      setIsActive={setIsActive}
      className="buySilverModal"
    >
      <>
        <div className="buySilverModalInner">
          <div>
            <p className="buySilverText">{useLang(silverModalSubTitle)}</p>
            <div className="selectAPackageBlock">
              <h4>{useLang(silverModalSelectAPackage)}</h4>
              <div className="selectAPackageContainer">
                {item.productContent.data.map((el: any, index: any) => (
                  <SilverPackage
                    selectedPack={selectedPack}
                    handlerSilverInput={handlerChangePackage}
                    item={el}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="inputSumBlock">
              <h4>{useLang(silverModalEnterTheAmount)}</h4>
              <div className="inputSum">
                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                  <input
                    onClick={() => setSelectedPack(undefined)}
                    type="text"
                    placeholder={useLang(silverModalInRubles)}
                    value={rubInput}
                    onChange={e => handlerRubsInput(e.target.value)}
                  />
                  <Rub />
                </div>
                <Equals />
                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                  <input
                    onClick={() => setSelectedPack(undefined)}
                    type="text"
                    placeholder={useLang(silverModalInCoins)}
                    value={coinInput}
                    onChange={e => {
                      handlerSilverInput(e.target.value);
                    }}
                  />
                  <Silver />
                </div>
              </div>
            </div>
          </div>
          {rubInput && coinInput ? (
            <button className="btn lightBtn buySilverBtn" onClick={handlerButton}>
              {rubInput} ₽
            </button>
          ) : (
            <button className="btn blackBtn buySilverBtn">0 ₽</button>
          )}
        </div>
      </>
    </Modal>
  );
};

export default BuySilverModal;
