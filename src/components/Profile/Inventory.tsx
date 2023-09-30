import React, { useState, useEffect, useRef } from 'react';
import '../../assets/scss/components/profile/_inventory.scss';
import Table from '../UI/Table';
import InventoryTableItem from './InventoryTableItem';
import SearchInput from '../UI/SearchInput';
import Loader from '../Loader';
import { header, per_page } from '../../consts/inventory';
import { userApi } from '../../store';
import Pagination from '../Pagination/Pagination';
import { useLang } from '../../hooks/useLang';
import { NoRecords } from '../../consts/leadersAndBanlist';

const Inventory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = userApi.useGetInventoryQuery({ count: per_page, page: currentPage });

  const [refund] = userApi.useRefundProductMutation();
  const [value, setValue] = useState('');

  const tableRef = useRef<any | null | React.LegacyRef<HTMLDivElement>>();

  useEffect(() => {
    tableRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.result.length === 0) {
    return <h1 className="noRecords">{useLang(NoRecords)}</h1>;
  }

  return (
    <div className="container">
      <div className="sortBlock">
        {/* <SearchInput placeholder="Введите название предмета" value={value} setValue={setValue} /> */}
        {/* <button className="btn blackBtn filterBtn">
          <SettingsIcon /> <span>Фильтр</span>
        </button> */}
      </div>
      <div ref={tableRef} className="tableWrap">
        <Table
          className="tableForInventory"
          header={header}
          data={data?.result}
          ItemComponent={InventoryTableItem}
          refund={refund}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesAmount={data.pages}
        perPage={per_page}
      />
    </div>
  );
};

export default Inventory;
