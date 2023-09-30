import React from 'react';
import '../../../../assets/scss/components/shop/modals/top-up/_top-up-item.scss';

interface TopUpItemProps {
  img: string;
  topTitle: string;
  bottomTitle: string;
  index: number;
  activePayments: number;
  setActivePayments: (index: number) => void;
  percentages: number;
  setCurrentPercentages: (param: number) => void;
}

const TopUpItem = ({
  img,
  topTitle,
  bottomTitle,
  index,
  activePayments,
  setActivePayments,
  percentages,
  setCurrentPercentages,
}: TopUpItemProps) => {
  const onClickHandler = () => {
    setActivePayments(index);
    setCurrentPercentages(percentages);
  };

  return (
    <div className={`${activePayments === index ? 'root rootActive' : 'root'}`} onClick={onClickHandler}>
      <div className="percentages">
        <div>+ {percentages}%</div>
      </div>
      <div className="top">
        <img src={img} className="img" alt="" />
      </div>
      <div className="bottom">
        <div className="topTitle">{topTitle}</div>
        <div className="bottomTitle">{bottomTitle}</div>
      </div>
    </div>
  );
};

export default TopUpItem;
