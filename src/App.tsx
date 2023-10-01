import "./App.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import "./assets/scss/app.scss";
import MainLayout from "./layout/MainLayout";
import ScrollToTop from "./utils/scrollToTop";
import { useEffect } from "react";
import Login from "./pages/Login";

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to={"/store"} />} />
          <Route path="store" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </>
  );
}

export default App;