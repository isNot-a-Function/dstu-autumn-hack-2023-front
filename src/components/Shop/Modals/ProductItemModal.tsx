import { useEffect, useState } from 'react';
import Modal from '../../UI/Modal';
import '../../../assets/scss/components/shop/modals/_product-item.scss';
import { ReactComponent as Timer } from '../../../assets/img/productItem/Timer.svg';
import { ReactComponent as Minus } from '../../../assets/img/productItem/minus.svg';
import { ReactComponent as Plus } from '../../../assets/img/productItem/plus.svg';
import { buyProductParams, getPriceProductParams } from '../../../types/userTypes';
import { getShopItem } from '../../../types/rustTypes';
import { useLang } from '../../../hooks/useLang';
import { modalBuy, productModalQuantity, productModalTotalAmount } from '../../../consts/modal';

interface ProductItemProps {
  isActive?: boolean;
  setIsActive: (param: boolean) => void;
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: (body: getPriceProductParams) => void;
  getPriceData: number | undefined;
}

const ProductItem = ({ setIsActive, item, buy, getPrice, getPriceData }: ProductItemProps) => {
  const [counter, setCounter] = useState(item.amount);
  const [selectedServer, setSelectedServer] = useState(0);

  const handlerButton = () => {
    buy({
      productId: item.id,
      amount: counter,
      serverId: Number(selectedServer),
    });
    setIsActive(false);
  };

  useEffect(() => {
    getPrice({ id: item.id, amount: counter });
  }, [counter]);

  return (
    <Modal setIsActive={setIsActive} headerTitle={item.name} className="productItemModal">
      <>
        <div>
          <div className="productItemImg">
            <img src={item.image} alt="" />
          </div>
        </div>
        <div>
          <div className="blocking">
            {item?.productContent?.description && (
              <>
                <Timer /> <span>{item.productContent.description}</span>
              </>
            )}
          </div>
          <div className="quantity">
            <h4>{useLang(productModalQuantity)}</h4>
            <div className="quantityBlock">
              <button
                onClick={() => setCounter(prev => (prev > item.amount ? prev - item.amount : prev))}
                className={`${counter <= 1 ? 'plus plusDis' : 'plus'} blackBtn`}
              >
                <Minus />
              </button>
              <div className="counter">{counter}</div>
              <button onClick={() => setCounter(prev => prev + item.amount)} className="plus blackBtn">
                <Plus />
              </button>
            </div>
          </div>

          <div className="totalAmount">
            <h4>{useLang(productModalTotalAmount)}</h4>
            <span>{getPriceData} ₽</span>
          </div>
          {/* <ChangeServer setSelectedServer={setSelectedServer} /> */}
          <button className="btn lightBtn wideBtn" onClick={handlerButton}>
            {useLang(modalBuy)}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default ProductItem;
