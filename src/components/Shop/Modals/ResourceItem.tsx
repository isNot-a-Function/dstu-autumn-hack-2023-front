import itemTest from '../../../assets/img/shop/itemTest.png';
import { ReactComponent as Flag } from '../../../assets/img/flagResourceItem.svg';
import { useWindowSize } from '../../../hooks/useWindowSize';

interface ResourceItemProps {
  image: string;
  count: number;
  flag?: boolean;
  size?: 'big' | 'small';
}

const ResourceItem = ({ image, count, flag = false, size }: ResourceItemProps) => {
  const dimensions = useWindowSize();

  return (
    <div
      className={`${
        dimensions.width <= 425 ? 'serviceItemElemOn85' : size === 'small' ? 'serviceItemElem' : 'serviceItemElemBig'
      }`}
    >
      {flag && (
        <div className="serviceItemElemFlag">
          <Flag />
        </div>
      )}
      <img src={image} alt="" />
      <span className="serviceItemElemCount">x{count}</span>
    </div>
  );
};
export default ResourceItem;
