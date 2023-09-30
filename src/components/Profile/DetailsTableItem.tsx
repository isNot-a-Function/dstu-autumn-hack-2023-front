import React from 'react';
import '../../assets/scss/components/profile/_detailsTableItem.scss';
import { getDetailsDataItem } from '../../types/userTypes';
import { getDate } from '../../utils/getDate';
import { getNameOperation } from '../../utils/getNameOperation';

export interface DetailsTableItemProps {
  data: getDetailsDataItem;
}

const DetailsTableItem: React.FC<DetailsTableItemProps> = ({ data }) => {
  return (
    <tr>
      <td className="tablePurple">{getDate(data.createdAt)}</td>
      <td className="tablePurple"># {data.id}</td>
      <td>{data?.product?.name_ru ? data?.name : ''}</td>
      <td>{data.amount !== undefined && data.type !== 'transaction' ? data.amount : ''}</td>

      <td>
        <span className={`${data.type == 'purchase' && data.refund === false ? '' : 'green'}`}>
          {data.lostMainBalance ? data.lostMainBalance : data.type === 'transaction' ? data.amount : '0'} ₽
        </span>
      </td>
      <td scope="row">{getNameOperation(data.type, data.refund)}</td>
      {/* <td>
        <div className="tableStatus"> */}
      {/* <span className={`${data.refund ? 'green' : ''}`}>{data.refund ? 'списание' : 'зачисление'}</span> */}
      {/* пока убрал статус */}
      {/* </div>
      </td> */}
    </tr>
  );
};

export default DetailsTableItem;
