import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { useNavigate } from "react-router-dom";

interface CaseProps {
  title: string;
  tags: string;
  isPractice?: boolean;
  id: string | number;
  link: string;
  onChange?: (value: any) => void;
}
const Case = ({
  title,
  tags,
  isPractice = false,
  id,
  link,
  onChange,
}: CaseProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="box-case"
      onClick={() => {
        if (onChange === undefined) {
          console.log("link", link);
          navigate(link);
        }
      }}
    >
      <div className="header-box-case">
        <span>{title}</span>
      </div>
      <div className="box-list-tags">
        <p className="box-tags">{tags}</p>
        <button className="btn blackBtn" onClick={onChange}>
          {onChange === undefined ? "ПОДРОБНЕЕ" : "ПРОЙТИ ТЕСТИРОВАНИЕ"}
        </button>
      </div>
    </div>
  );
};

export default Case;
