import React from 'react';
import { ReactComponent as Timer } from '../../../../assets/img/productItem/Timer.svg';
import WarningMessage from '../WarningMessage';
import { productContentServiceItem } from '../../../../types/rustTypes';
import { getCase } from '../../../../utils/getCase';
import ResourceItem from '../ResourceItem';
import { useLang } from '../../../../hooks/useLang';
import { serviceInfoModalManyHours, serviceInfoModalOneHour, serviceInfoModalTwoHours } from '../../../../consts/modal';

const ServiceItem = ({ alert, itemData, label, time }: productContentServiceItem) => {
  return (
    <>
      <div className="serviceItem">
        <div className="serviceItemTop">
          <h3 className="serviceItemHeader">{label}</h3>
          {time && (
            <div className="serviceItemTimer">
              <Timer />{' '}
              <p>
                {time +
                  ' ' +
                  getCase(time, [
                    useLang(serviceInfoModalOneHour),
                    useLang(serviceInfoModalTwoHours),
                    useLang(serviceInfoModalManyHours),
                  ])}
              </p>
            </div>
          )}
        </div>
        <div className="serviceItemContainer">
          {itemData?.map((el, index) => (
            <ResourceItem size="small" image={el.image} count={el.amount} flag={el.customFlag} key={index} />
          ))}
        </div>
        {alert != null && <WarningMessage text={alert} />}
      </div>
    </>
  );
};

export default ServiceItem;
