import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../assets/img/modal/CloseIcon.svg';
import boss from '../../../../assets/img/shop/bossModal.jpg';
import ServiceItem from './ServiceItem';
import ChangeServer from '../ChangeServer';
import { useBodyScrollModal } from '../../../../hooks/useBodyScrollModal';
import ServiceInfo from './ServiceInfo';
import { buyProductParams, getPriceProductParams } from '../../../../types/userTypes';
import { getShopItem } from '../../../../types/rustTypes';
import { useLang } from '../../../../hooks/useLang';
import { serviceModalBuyFor } from '../../../../consts/modal';

interface ServiceModalProps {
  setIsActive: (param: boolean) => void;
  item: getShopItem;
  className?: string;
  buy: (body: buyProductParams) => void;
  getPrice: (body: getPriceProductParams) => void;
  getPriceData: number | undefined;
}

const ServiceModal = ({ setIsActive, item, className, buy, getPrice, getPriceData }: ServiceModalProps) => {
  const [selectedServer, setSelectedServer] = useState(0);

  const handlerButton = () => {
    buy({
      productId: item.id,
      amount: item.amount,
      serverId: Number(selectedServer),
    });
    setIsActive(false);
  };

  useEffect(() => {
    getPrice({ id: item.id, amount: 1 });
  }, []);

  useBodyScrollModal();

  return (
    <div className="modal modalActive" onClick={() => setIsActive(false)}>
      <div className="modalContent mountedStyle serviceModal modalContentActive" onClick={e => e.stopPropagation()}>
        <div className="serviceModalLeft">
          <img className="serviceModalLeftImg" src={item.productContent.imageModal} alt="" />
          <div className="serviceModalLeftInfo">
            <ServiceInfo item={item} />
          </div>
        </div>
        <div className="serviceModalRight">
          <div className="modalBackground" />
          <div className="serviceModalRightInner">
            <div className={`${'modalHeaderSmallBottom'}`}>
              <h3 className="modalHeaderTitle">{item.name}</h3>
              <div className="boxCloseIconHeaderTitle">
                <CloseIcon onClick={() => setIsActive(false)} />
              </div>
            </div>
            <div className="serviceModalInfoMobile">
              <ServiceInfo item={item} />
            </div>
            <div className="serviceModalRightContent">
              {item.productContent.data &&
                item.productContent.data.map((el: any, index: any) => <ServiceItem {...el} key={index} />)}
              {<div className="serviceModalRightContentDescription">{item.productContent.descriptionModal}</div>}
            </div>
            <ChangeServer setSelectedServer={setSelectedServer} />
            <button className="btn lightBtn wideBtn" onClick={() => handlerButton()}>
              {useLang(serviceModalBuyFor)} {getPriceData}₽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
