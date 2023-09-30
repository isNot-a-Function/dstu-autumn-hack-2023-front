import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { customPageApi } from '../store';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MainLayout = () => {
  const { data: baseInfo, isLoading } = customPageApi.useGetSettingsQuery();
  useDocumentTitle(baseInfo?.header);
  if (isLoading) return <Loader />;
  return (
    <>
      {baseInfo && <Navbar navbar={baseInfo} />}
      <Outlet />
      {baseInfo && <Footer data={baseInfo} />}
    </>
  );
};

export default MainLayout;
