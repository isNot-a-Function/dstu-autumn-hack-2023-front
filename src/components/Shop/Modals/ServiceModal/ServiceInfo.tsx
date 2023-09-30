import { serviceInfoModalPointsHome, serviceInfoModalRatings, serviceInfoModalTPDelay } from '../../../../consts/modal';
import { useLang } from '../../../../hooks/useLang';
import { getShopItem } from '../../../../types/rustTypes';

interface ServiceInfoProps {
  item: getShopItem;
}
const ServiceInfo = ({ item }: ServiceInfoProps) => {
  const leftSideData = [
    {
      title: useLang(serviceInfoModalRatings),
      value: item.productContent.rade,
      label: `x${item.productContent.rade}`,
    },
    {
      title: useLang(serviceInfoModalTPDelay),
      value: item.productContent.delay,
      label: `${item.productContent.delay} с`,
    },
    {
      title: useLang(serviceInfoModalPointsHome),
      value: item.productContent.setHome,
      label: `+${item.productContent.setHome}`,
    },
  ];

  return (
    <div className="serviceModalLeftInfoBlock">
      {leftSideData.map(
        (el, index) =>
          el.value != null && (
            <div className="serviceModalLeftInfoItem" key={index}>
              <h4 className="serviceModalLeftInfoItemTitle">{el.title}</h4>
              <span className="serviceModalLeftInfoItemCount">{el.label}</span>
            </div>
          ),
      )}
    </div>
  );
};
export default ServiceInfo;
