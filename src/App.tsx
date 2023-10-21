import "./App.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import "./assets/scss/app.scss";
import MainLayout from "./layout/MainLayout";
import ScrollToTop from "./utils/scrollToTop";
import { useEffect } from "react";
import Login from "./pages/Login";
import Flight from "./pages/Flight";
// import HistoryBalance from "./pages/HistoryBalance";
import User from "./pages/UserPage";
import Chat from "./pages/Chat";
import Trainee from "./pages/Trainee";
import CasePage from "./pages/CasePage";
import CreateQuestions from "./pages/СreateQuestions";
import Practice from "./pages/Practice";
import ResponsesPractice from "./pages/ResponsesPractice";
import ResponsesTrainee from "./pages/ResponsesTrainee";
import UserPage from "./pages/UserPage";

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
          <Route path="profile/:id" element={<User />} />
          <Route path="trainee/:id" element={<CasePage />} />
          <Route path="practice/:id" element={<CasePage />} />
          <Route path="responses/practice" element={<ResponsesPractice />} />
          <Route path="responses/trainee" element={<ResponsesTrainee />} />
          <Route path="responses/practice/:id" element={<UserPage />} />
          <Route path="responses/trainee/:id" element={<UserPage />} />
          <Route path="trainee" element={<Trainee />} />
          <Route path="practice" element={<Practice />} />
          <Route path="login" element={<Login />} />
          <Route path="flight/:id" element={<Flight />} />
          <Route path="create/test" element={<CreateQuestions />} />
          {/* <Route path="balance" element={<HistoryBalance />} /> */}
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </>
  );
}

export default App;
