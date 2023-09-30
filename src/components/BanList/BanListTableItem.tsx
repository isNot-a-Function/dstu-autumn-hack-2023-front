import React from 'react';
import { getBanListItem } from '../../types/rustTypes';
import { Link } from 'react-router-dom';
import { timeConverter } from '../../utils/timeConverter';

interface BanListTableItemProps {
  data: getBanListItem;
}

const BanListTableItem: React.FC<BanListTableItemProps> = ({ data }) => {
  return (
    <tr>
      <td className="tablePurple" scope="row">
        {timeConverter(data.time)}
      </td>
      <td>
        <Link style={{ cursor: 'pointer' }} to={`https://steamcommunity.com/profiles/${data.steamid}`}>
          {data.nickname}
        </Link>
      </td>
      <td className="tablePurple">{data.reason}</td>
      <td>{data.banip === 1 && '+'}</td>
    </tr>
  );
};

export default BanListTableItem;
