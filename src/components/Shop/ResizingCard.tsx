import { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getShopItem } from '../../types/rustTypes';
import ProductItemModal from './Modals/ProductItemModal';
import BuySilverModal from './Modals/BuySilverModal/BuySilverModal';
import ServiceModal from './Modals/ServiceModal/ServiceModal';
import {
  buyProductParams,
  getPriceProductParams,
  getPriceCurrencyParams,
  getPriceCurrencyData,
} from '../../types/userTypes';
import NotificationModal from './Modals/NotificationModal';
import Discount from '../Discount';

interface ResizingCardProps {
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: ((body: getPriceProductParams) => void) | ((body: getPriceCurrencyParams) => void);
  getPriceData: any;
}

const ResizingCard = ({ item, buy, getPrice, getPriceData }: ResizingCardProps) => {
  const dimensions = useWindowSize();
  const [isActiveModal, setIsActiveModal] = useState(false);

  const backgroundImageGradient =
    item.buttonColor === 'GREEN'
      ? `linear-gradient(to bottom,  rgba(0, 71, 11, 0.00) 40%, #00470B 100%), url(${item.image}) `
      : `linear-gradient(to bottom, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;

  const gradientOfBigCard = `linear-gradient(to top, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;

  const changeModal = () => {
    if (item.type === 'GAME_ITEM')
      return (
        <ProductItemModal
          setIsActive={setIsActiveModal}
          item={item}
          buy={buy}
          getPrice={getPrice}
          getPriceData={getPriceData}
        />
      );
    if (item.type === 'CURRENCY' && item.productContent)
      return (
        <BuySilverModal
          setIsActive={setIsActiveModal}
          item={item}
          buy={buy}
          getPrice={getPrice}
          getPriceData={getPriceData}
        />
      );
    if (item.type === 'SERVICE')
      return (
        <ServiceModal
          setIsActive={setIsActiveModal}
          item={item}
          buy={buy}
          getPrice={getPrice}
          getPriceData={getPriceData}
        />
      );
    if (item.type === 'HTTP_REQUEST') return <NotificationModal setIsActive={setIsActiveModal} />;
  };

  return (
    <>
      <div
        className={`resizingCard ${item.blockSize === 1 ? 'resizingOneColumnCard' : ''}`}
        style={{
          backgroundImage: item.blockSize === 1 ? backgroundImageGradient : gradientOfBigCard,
          gridColumn: `span ${dimensions.width <= 1280 ? 2 : item.blockSize} `,
          height: dimensions.width <= 1280 ? 240 : item.height,
        }}
        onClick={() => setIsActiveModal(true)}
      >
        {!!item.discount && <Discount title={item.discount} />}
        <div>
          <p className="labelResizingCard">{item.name}</p>
          <p className="descriptionResizingCard">{item?.description?.replace('<br/>', '')}</p>
        </div>

        <button className={`btn ${item.buttonColor === 'GREEN' ? 'greenBtn' : 'lightBtn'} resizingCardBtn`}>
          {item.iconButton && <img src={item.iconButton} style={{ width: 24, height: 24, marginRight: 8 }} />}
          {item.textButton ? item.textButton : item.price + ' ₽'}
        </button>
        {isActiveModal && changeModal()}
      </div>
    </>
  );
};

export default ResizingCard;
