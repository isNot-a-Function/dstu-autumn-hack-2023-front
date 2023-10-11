import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { ReactComponent as Money } from "../../assets/img/money.svg";
import { useNavigate } from "react-router-dom";
import { getHours } from "../../utils/getHours";

interface CaseProps {}
const TrainCard = ({}: CaseProps) => {
  const navigate = useNavigate();

  const tags = ["Плацкарт | 20 ", "Купе | 120", "СВ | 20", "Люкс | 1"];

  return (
    <div className="box-case" onClick={() => navigate(`/store`)}>
      <div className="header-box-case">
        <span>047M ПОЕЗД ТАВРИЯ</span>
        <div className="box-price">
          <Money />
          <p>от 500 р</p>
        </div>
      </div>
      <div className="body-train-card">
        <div className="box-places">
          <div className="place-item">
            <h1>10:41</h1>
            <p>17.10.2023</p>
            <p>Ростов-на-Дону</p>
          </div>
          <div className="place-item">
            <h1>-</h1>
          </div>
          <div className="place-item">
            <h1>10:41</h1>
            <p>17.10.2023</p>
            <p>Ростов-на-Дону</p>
          </div>
        </div>

        <div className="box-free-place">
          <p>Cвободные места</p>
          <div className="box-list-tags">
            {tags.map((tag) => (
              <p className="box-tags" key={tag}>
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;
