import { useState } from 'react';
import { getShopItem } from '../../types/rustTypes';
import ServiceModal from './Modals/ServiceModal/ServiceModal';
import { buyProductParams, getPriceProductParams } from '../../types/userTypes';
import Discount from '../Discount';

interface NoBackgroundCardProps {
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: (body: getPriceProductParams) => void;
  getPriceData: number | undefined;
}

const NoBackgroundCard = ({ item, buy, getPrice, getPriceData }: NoBackgroundCardProps) => {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const handlerClick = () => {
    setIsActiveModal(true);
  };

  const checkSection = () => {
    const section = localStorage.getItem('section');
    return section === null || Number(section) === 0 ? true : false;
  };

  return (
    <>
      <div
        className="oneColumnCard"
        onClick={handlerClick}
        style={{ zIndex: isActiveModal || checkSection() ? '' : 11 }}
      >
        {!!item.discount && <Discount title={item.discount} />}
        {isActiveModal && (
          <ServiceModal
            setIsActive={setIsActiveModal}
            item={item}
            buy={buy}
            getPrice={getPrice}
            getPriceData={getPriceData}
          />
        )}
        <div>
          <img src={item.image} className="imageOneColumnCard" />
        </div>

        {/* <div className="bottomOneColumnCard"> */}
        <p className="nameOneColumnCard">{item.name}</p>
        <button className="lightBtn btn oneColumnBtn ">{item.price} ₽</button>
        {/* </div> */}
      </div>
    </>
  );
};

export default NoBackgroundCard;
