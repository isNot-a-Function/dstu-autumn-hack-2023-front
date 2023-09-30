import React, { useEffect, useState } from 'react';
import { ReactComponent as Place1 } from '../../assets/img/pedestal/place1.svg';
import { ReactComponent as Place2 } from '../../assets/img/pedestal/place2.svg';
import { ReactComponent as Place3 } from '../../assets/img/pedestal/place3.svg';
import avatarSteam from '../../assets/img/avatarSteam.jpeg';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getLeadersItem } from '../../types/userTypes';
import { getValueFormData } from '../../utils/getValueForData';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useLang } from '../../hooks/useLang';
import { leadersPedestalGlasses, leadersPedestalMurders } from '../../consts/leadersAndBanlist';

interface PedestalItemProps {
  data: getLeadersItem;
}
const PedestalItem = ({ data }: PedestalItemProps) => {
  const [marginTop, setMarginTop] = useState(0);
  const [colorBorder, setColorBorder] = useState('');
  const [colorPlace, setColorPlace] = useState('');
  const dimensions = useWindowSize();

  const getDefaultVariadbles = () => {
    switch (getValueFormData(data).pos) {
      case 1:
        setColorBorder('#fff064');
        setColorPlace('#D06400');
        break;
      case 2:
        setColorBorder('#F0F0F0');
        setColorPlace('#8A8A8A');
        setMarginTop(dimensions.width >= 700 ? 25 : 0);
        break;
      case 3:
        setColorBorder('#D6945C');
        setColorPlace('#814629');
        setMarginTop(dimensions.width >= 700 ? 65 : 0);
        break;
    }
  };

  useEffect(() => {
    data && getDefaultVariadbles();
  }, [dimensions]);

  const getImage = () => {
    if (!data) return undefined;
    if (getValueFormData(data).data.avatar === null) return avatarSteam;
    if (String(getValueFormData(data).data.avatar).indexOf('medium') === -1) return getValueFormData(data).data.avatar;

    return String(getValueFormData(data).data.avatar).replace('medium', 'full');
  };

  return (
    <Link style={{ cursor: 'pointer' }} to={`https://steamcommunity.com/profiles/${Object.keys(data)[0]}`}>
      <div className="containerPedestalItem" style={{ marginTop: marginTop }}>
        <div className="boxAvatarUser">
          <img src={getImage()} alt="" className="avatarUser" style={{ borderColor: colorBorder }} />
          {getValueFormData(data).pos === 1 && <Place1 className="placeUser" />}
          {getValueFormData(data).pos === 2 && <Place2 className="placeUser" />}
          {getValueFormData(data).pos === 3 && <Place3 className="placeUser" />}
          <p className="textPlace" style={{ color: colorPlace }}>
            {getValueFormData(data).pos}
          </p>
        </div>
        <p className="baseTextPedestalItem namePedestalItem">{getValueFormData(data).data.name}</p>
        {/* <p className="baseTextPedestalItem pointsRedestalItem">{data.countPoints} очков</p> */}
        <div className="boxStatisticInPedestalItem">
          <div className="miniBoxStatistic">
            <p className="labelStatictic">{useLang(leadersPedestalGlasses)}</p>
            <p className="countStatictic">{getValueFormData(data).stats.kp_total}</p>
          </div>
          <div className="miniBoxStatistic">
            <p className="labelStatictic">{useLang(leadersPedestalMurders)}</p>
            <p className="countStatictic">{getValueFormData(data).stats.d_player}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PedestalItem;
