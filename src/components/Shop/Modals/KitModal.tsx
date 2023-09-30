import { useState } from 'react';
import { getShopItem } from '../../../types/rustTypes';
import { buyProductParams, getPriceProductParams } from '../../../types/userTypes';
import Modal from '../../UI/Modal';
import ResourceItem from './ResourceItem';
import { useLang } from '../../../hooks/useLang';
import { kitModalTitle, modalBuy } from '../../../consts/modal';

interface KitModalProps {
  setIsActive: (param: boolean) => void;
  itemData: any[];
  item: getShopItem;
  buy: (body: buyProductParams) => void;
  getPrice: (body: getPriceProductParams) => void;
  getPriceData: number | undefined;
}

const KitModal = ({ setIsActive, itemData, item, buy, getPrice, getPriceData }: KitModalProps) => {
  const [selectedServer, setSelectedServer] = useState(0);

  const handlerButton = () => {
    buy({
      productId: item.id,
      amount: 1,
      serverId: Number(selectedServer),
    });
    setIsActive(false);
  };

  return (
    <Modal setIsActive={setIsActive} headerTitle={item.name} className="megaBuilderKitModal">
      <div className="megaBuilderContainerWrap">
        <div className={`${itemData.length < 13 ? 'megaBuilderContainerOn4' : 'megaBuilderContainerOn6'}`}>
          {itemData.map((el, index) => (
            <ResourceItem
              image={el.icon}
              count={el.amount}
              flag={el.customFlag}
              key={index}
              size={itemData.length < 13 ? 'big' : 'small'}
            />
          ))}
        </div>
        <button onClick={handlerButton} className="btn lightBtn wideBtn">
          {useLang(modalBuy)}
        </button>
      </div>
    </Modal>
  );
};

export default KitModal;
