import React from 'react';
import '../../assets/scss/components/leaders/_leader-table-item.scss';
import { getLeadersItem } from '../../types/userTypes';
import { timeConverter } from '../../utils/timeConverter';
import { Link, useNavigate } from 'react-router-dom';
import { getValueFormData } from '../../utils/getValueForData';

export interface LeadersTableItemProps {
  data: getLeadersItem;
}

const LeadersTableItem: React.FC<LeadersTableItemProps> = ({ data }) => {
  return (
    <tr>
      <td scope="row"># {getValueFormData(data).pos}</td>
      <td>
        <Link style={{ cursor: 'pointer' }} to={`https://steamcommunity.com/profiles/${Object.keys(data)[0]}`}>
          <div className="userBlock">
            {data && getValueFormData(data).data?.avatar ? (
              <img className="userImg" src={getValueFormData(data).data.avatar} alt="" />
            ) : (
              <div className="userImg userImgNone" />
            )}

            <span className="userName">{getValueFormData(data).data?.name}</span>
          </div>
        </Link>
      </td>
      {/* <td>{getValueFormData(data).stats.p_score}</td> */}
      <td>{getValueFormData(data).stats?.kp_total}</td>
      <td>{getValueFormData(data).stats?.d_player}</td>
      <td>{timeConverter(getValueFormData(data).stats?.p_lastjoin)}</td>
    </tr>
  );
};

export default LeadersTableItem;
