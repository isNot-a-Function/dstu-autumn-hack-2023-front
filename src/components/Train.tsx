import { ReactComponent as Logo } from "../assets/img/logo.svg";
const Train = () => {
  return (
    <div className="box-train">
      <div className="box-logo-login">
        {" "}
        <Logo />
      </div>

      <div className="title-login">
        <p style={{ color: "white" }}>ДЛЯ СТАЖЁРОВ</p>
        <p style={{ color: "white" }}>И ПРАКТИКАНТОВ</p>
      </div>
    </div>
  );
};

export default Train;
