import { useState } from 'react';
import ProductItemModal from './Modals/ProductItemModal';
import { getShopItem } from '../../types/rustTypes';
import { buyProductParams, getPriceProductParams } from '../../types/userTypes';
import Discount from '../Discount';
import KitModal from './Modals/KitModal';
interface NoBackgroundCardProps {
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: (body: getPriceProductParams) => void;
  getPriceData: number | undefined;
}

const BackgroundCard = ({ item, buy, getPrice, getPriceData }: NoBackgroundCardProps) => {
  const [isActiveModal, setIsActiveModal] = useState(false);
  return (
    <>
      <div className="oneColumnCard oneColumnCardHaveBack" onClick={() => setIsActiveModal(true)}>
        {!!item.discount && <Discount title={item.discount} />}
        <img src={item.image} className="imageCardHaveBack" />
        <p>{item.name}</p>
        <button className="lightBtn btn oneColumnBtn">
          {item.discount ? (
            <>
              <span className="discount-price">{item.basePrice} ₽</span>
              <span>{item.price}</span> ₽
            </>
          ) : (
            <span>{item.price} ₽</span>
          )}
        </button>
        {item.type === 'GAME_ITEM'
          ? isActiveModal && (
              <ProductItemModal
                isActive={isActiveModal}
                setIsActive={setIsActiveModal}
                item={item}
                buy={buy}
                getPrice={getPrice}
                getPriceData={getPriceData}
              />
            )
          : isActiveModal && (
              <KitModal
                item={item}
                getPriceData={getPriceData}
                getPrice={getPrice}
                buy={buy}
                setIsActive={setIsActiveModal}
                itemData={item.productContent.data}
              />
            )}
      </div>
    </>
  );
};

export default BackgroundCard;
