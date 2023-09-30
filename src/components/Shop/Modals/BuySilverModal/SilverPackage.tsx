import { itemDataCurrency } from '../../../../types/rustTypes';
import miniMoney from '../../../../assets/img/buySilver/miniMoney.png';
import middleMoney from '../../../../assets/img/buySilver/middleMoney.png';
import maxMoney from '../../../../assets/img/buySilver/maxMoney.png';

interface SilverPackageProps {
  selectedPack: number | undefined;
  handlerSilverInput: (value: any) => void;
  item: itemDataCurrency;
}

const SilverPackage = ({ selectedPack, handlerSilverInput, item }: SilverPackageProps) => {
  const imgArray = [miniMoney, middleMoney, maxMoney];
  const handletChangePackage = () => {
    handlerSilverInput(item);
  };
  return (
    <div className="packageItem" onClick={handletChangePackage}>
      {/* <div className="labelPackageItem">{item.count}</div> */}
      <div className="percentages">
        <div>+ {item.procent}%</div>
      </div>
      <img
        className={`${selectedPack === item.id ? 'selectAPackageItem selectAPackageItemActive' : 'selectAPackageItem'}`}
        src={imgArray[item.id - 1]}
        alt=""
      />
    </div>
  );
};
export default SilverPackage;
