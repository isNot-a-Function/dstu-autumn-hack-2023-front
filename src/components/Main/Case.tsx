import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { useNavigate } from "react-router-dom";

interface CaseProps {
  title: string;
  tags: string;
}
const Case = ({ title, tags }: CaseProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="box-case"
      onClick={() => {
        navigate("/case/1");
      }}
    >
      <div className="header-box-case">
        <span>{title}</span>
      </div>
      <div className="box-list-tags">
        <p className="box-tags">{tags}</p>
        <button className="btn blackBtn">ПОДРОБНЕЕ</button>
      </div>
    </div>
  );
};

export default Case;
