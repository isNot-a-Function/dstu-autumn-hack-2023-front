import { useLang } from '../../../../hooks/useLang';
import {
  topUpModalBonusForPaymentMethod,
  topUpModalEnteredAmount,
  topUpModalTotalAmount,
} from '../../../../consts/modal';

interface BottomSideProps {
  amountInput: string;
  percentages: number;
}

const BottomSide = ({ amountInput, percentages }: BottomSideProps) => {
  return (
    <div className="bottomSide">
      {/* <div className="bottomSideItem">
        <span className="bottomSideItemTitle">{useLang(topUpModalEnteredAmount)}</span>
        <span className="bottomSideItemTitle">{amountInput} ₽</span>
      </div> */}
      <div className="bottomSideItem">
        <span className="bottomSideItemTitle">{useLang(topUpModalBonusForPaymentMethod)}</span>
        <span className="bottomSideItemPercent">+{percentages}%</span>
      </div>
      {/* <div className="bottomSideItem">
              <span className="bottomSideItemTitle">Промокод</span>
              <span className="bottomSideItemPercent">+5%</span>
      </div> */}
      <div className="bottomSideItem">
        <span className="bottomSideItemAmountTitle">{useLang(topUpModalTotalAmount)}</span>
        <span className="bottomSideItemAmountPrice">{amountInput} ₽</span>
      </div>
    </div>
  );
};

export default BottomSide;
