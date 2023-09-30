import React from 'react';
import { getDetailsDataItem, getLeadersItem, CurrentPlayer, getInventoryDataItem } from '../../types/userTypes';
import { getBanListItem } from '../../types/rustTypes';

interface ITableHeader {
  id: number;
  name: string;
}

interface TableProps<T> {
  header: ITableHeader[];
  data: getLeadersItem[] | getInventoryDataItem[] | getDetailsDataItem[] | getBanListItem[];
  ItemComponent: React.FC<{ data: T }>;
  className: string;
  infoOfLeaders?: CurrentPlayer;
  isLeaders?: boolean;
  refund?: (value: string | number) => void;
}

function Table<T>({ header, data, ItemComponent, className, isLeaders = false, infoOfLeaders, refund }: TableProps<T>) {
  return (
    <table className={className}>
      <thead>
        <tr>
          {header.map((el, index) => (
            <th scope="col" key={index}>
              {el.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <></>
        {isLeaders && infoOfLeaders && (
          <>
            <ItemComponent data={infoOfLeaders as T} key={-1} />
            <tr className="marginTableItem"></tr>
          </>
        )}
        {data &&
          data.map((el, index) => {
            return <ItemComponent data={(refund ? { dataInventory: el, refund: refund } : el) as T} key={index} />;
          })}
      </tbody>
    </table>
  );
}

export default Table;
