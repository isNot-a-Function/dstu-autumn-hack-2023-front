import "./App.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import "./assets/scss/app.scss";
import MainLayout from "./layout/MainLayout";
import CustomPage from "./components/CustomPage/CustomPage";
import { customPageApi } from "./store";
import { getCustomPagesData } from "./types/customPageTypes";
import ScrollToTop from "./utils/scrollToTop";
import { useEffect } from "react";

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const { data: customPages, isLoading: isLoadingCustomPage } =
    customPageApi.useGetCustomPagesQuery();
  const { data: baseInfo, isLoading } = customPageApi.useGetSettingsQuery();

  const routeComponents = customPages?.map(
    (item: getCustomPagesData, index: any) => (
      <Route
        path={item.url}
        element={<CustomPage haveSection={item.isHaveSidebar} id={item.id} />}
        key={index}
      />
    )
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/servers');
  // }, []);

  if (isLoadingCustomPage) return <></>;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routeComponents}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  baseInfo?.mainPage !== undefined
                    ? baseInfo.mainPage
                    : "/store"
                }
              />
            }
          />
          <Route path="store" element={<Main />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to={
                baseInfo?.mainPage !== undefined ? baseInfo.mainPage : "/store"
              }
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
