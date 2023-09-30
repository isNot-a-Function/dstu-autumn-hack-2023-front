import { useEffect, useState, useRef } from 'react';
import { ReactComponent as Plus } from '../../assets/img/Plus.svg';
import { ReactComponent as Settings } from '../../assets/img/profile/settings.svg';
import '../../assets/scss/components/profile/_details.scss';
import Table from '../UI/Table';
import DetailsTableItem from './DetailsTableItem';
import { userApi } from '../../store';
import { header, per_page } from '../../consts/details';
import Pagination from '../Pagination/Pagination';
import CustomSelect from '../UI/CustomSelect';
import Loader from '../Loader';
import TopUpModal from '../Shop/Modals/TopUp/TopUpModal';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLang } from '../../hooks/useLang';
import { NoRecords } from '../../consts/leadersAndBanlist';
import {
  detailsPageBalance,
  detailsPageRefill,
  detailsPageSelectNew,
  detailsPageSelectOld,
} from '../../consts/profile';

const Details = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dimensions = useWindowSize();
  const [sortValue, setSortValue] = useState('desc');
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { data, isLoading } = userApi.useGetDetailsQuery({ page: currentPage, count: per_page, sort: sortValue });
  const { data: userBalace } = userApi.useGetBalanceQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [sortValue]);

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
      <div className="topDetails">
        <div className="balance" onClick={() => setIsActiveModal(true)}>
          <div className="balanceInfo">
            <p className="balanceTitle">{useLang(detailsPageBalance)}</p>
            <h3 className="balanceCount">{userBalace?.balance} ₽</h3>
          </div>

          {isActiveModal && <TopUpModal setIsActive={setIsActiveModal} />}

          <div className="balanceBtnBlock">
            <button className="btn lightBtn balanceBtn">
              <Plus />
              <span>{useLang(detailsPageRefill)}</span>
            </button>
            {/* <button className="btn blackBtn balanceBtn">Перевести</button> */}
          </div>
        </div>
        <div className="containerSelect">
          <CustomSelect
            options={[
              { value: 'desc', label: useLang(detailsPageSelectNew) },
              { value: 'asc', label: useLang(detailsPageSelectOld) },
            ]}
            heightSelect={dimensions.width >= 1280 ? 50 : 40}
            onChange={e => setSortValue(e.value)}
          />
        </div>
      </div>

      {/* <SearchInput placeholder="Введите название предмета" value={searchValue} setValue={setSearchValue} /> */}
      <div ref={tableRef} className="tableWrap">
        <Table className="tableForDetails" header={header} data={data?.result} ItemComponent={DetailsTableItem} />
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

export default Details;
