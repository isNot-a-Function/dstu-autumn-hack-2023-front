import React, { useState, useEffect } from 'react';
import HeaderShop from '../components/Shop/HeaderShop';
import NoBackgroundCard from '../components/Shop/NoBackgroundCard';
import BackgroundCard from '../components/Shop/BackgroundCard';
import ResizingCard from '../components/Shop/ResizingCard';
import { getShopItem } from '../types/rustTypes';
import { rustApi } from '../store';
import { useBodyScroll } from '../hooks/useBodyScroll';
import { userApi } from '../store';
import Loader from '../components/Loader';
import UnauthorizedModal from '../components/Shop/Modals/UnauthorizedModal';
import LackOfFundsModal from '../components/Shop/Modals/LackOfFunds';
import TopUpModal from '../components/Shop/Modals/TopUp/TopUpModal';

const Main = () => {
  const [buy, { isError: isErrorBuy, error }] = userApi.useBuyProductMutation();
  const [getPrice, { data: getPriceData }] = userApi.useLazyGetPriceProductQuery();
  const [getPriceCurrency, { data: getPriceCurrencyData }] = userApi.useLazyGetPriceCurrencyQuery();
  const [activeMode, setActiveMode] = useState(
    localStorage.getItem('section') != null ? Number(localStorage.getItem('section')) : 0,
  );
  const { data: dataShop, isLoading: dataShopLoading } = rustApi.useGetShopQuery(activeMode !== 0 ? activeMode : 1);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveLackOfFundsModal, setIsActiveLackOfFundsModal] = useState(false);
  const [isActiveTopUpModal, setIsActiveTopUpModal] = useState(false);

  useBodyScroll(activeMode === 0 ? true : false);

  useEffect(() => {
    isErrorBuy ? setIsActiveModal(true) : setIsActiveModal(false);
    isErrorBuy ? setIsActiveLackOfFundsModal(true) : setIsActiveLackOfFundsModal(false);
  }, [isErrorBuy]);

  const cardSelection = (item: getShopItem) => {
    if (item.type === 'GAME_ITEM' && item.isBackgroundImage === false)
      return <BackgroundCard item={item} key={item.nameID} buy={buy} getPrice={getPrice} getPriceData={getPriceData} />;
    if (item.type === 'SETS_OF_PRODUCTS' && item.isBackgroundImage === false)
      return <BackgroundCard item={item} key={item.nameID} buy={buy} getPrice={getPrice} getPriceData={getPriceData} />;
    if (item.type === 'SERVICE' && item.isBackgroundImage === false)
      return (
        <NoBackgroundCard key={item.nameID} item={item} buy={buy} getPrice={getPrice} getPriceData={getPriceData} />
      );
    if (item.type === 'CURRENCY')
      return (
        <ResizingCard
          key={item.nameID}
          item={item}
          buy={buy}
          getPrice={getPriceCurrency}
          getPriceData={getPriceCurrencyData}
        />
      );
    return <ResizingCard key={item.nameID} item={item} buy={buy} getPrice={getPrice} getPriceData={getPriceData} />;
  };

  if (dataShopLoading) return <Loader />;

  return (
    <div>
      {isActiveTopUpModal && <TopUpModal setIsActive={setIsActiveTopUpModal} />}
      {/*  @ts-ignore */}
      {/* {error && error.status === 401 && isActiveModal && <UnauthorizedModal setIsActive={setIsActiveModal} />} */}
      {/*  @ts-ignore */}
      {error && error.status === 400 && isActiveLackOfFundsModal && (
        <LackOfFundsModal setIsActive={setIsActiveLackOfFundsModal} setIsActiveTopUpModal={setIsActiveTopUpModal} />
      )}
      {activeMode === 0 && <div className="blackoutWindows"></div>}
      <HeaderShop activeSection={activeMode} setActiveSection={setActiveMode} />
      <div className="container container-shop">{dataShop?.map(item => cardSelection(item))}</div>
    </div>
  );
};

export default Main;
