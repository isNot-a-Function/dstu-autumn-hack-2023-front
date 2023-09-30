import { itemDataMoney } from '../../types/rustTypes';
import '../../assets/scss/components/progressBar/_progress-bar.scss';
import { useEffect } from 'react';
interface ProgressBarProps {
  item: itemDataMoney[];
  activeValue: string | number;
}

const ProgressBar = ({ item, activeValue }: ProgressBarProps) => {
  const checkValue = (index: number) => {
    if (activeValue === '') {
      return true;
    }
    if (item[index].count <= +activeValue) {
      if (item[index + 1]) {
        if (item[index + 1].count > +activeValue) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="box">
      {item.map((el, index) => (
        <div className={`section ${checkValue(index) ? 'sectionActive' : ''}`} key={index}>
          <div className="sectionScale">+{el.procent}%</div>
          <div className="label">{el.count} ₽</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
