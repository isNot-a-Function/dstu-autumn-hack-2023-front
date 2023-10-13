import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { ReactComponent as Money } from "../../assets/img/money.svg";
import { useNavigate } from "react-router-dom";
import { getHours } from "../../utils/getHours";
import { flightsDataItem } from "../../types/flightTypes";

interface CaseProps {
  data: flightsDataItem;
}
const TrainCard = ({ data }: CaseProps) => {
  const navigate = useNavigate();

  const getTags = () => {
    let tags = [];
    if (data.freePlacesCount.reserved !== 0) {
      tags.push(`Плацкарт | ${data.freePlacesCount.reserved} `);
    }
    if (data.freePlacesCount.coupe !== 0) {
      tags.push(`Купе | ${data.freePlacesCount.coupe}`);
    }
    if (data.freePlacesCount.sv !== 0) {
      tags.push(`СВ | ${data.freePlacesCount.sv}`);
    }
    if (data.freePlacesCount.lux !== 0) {
      tags.push(`Люкс | ${data.freePlacesCount.lux}`);
    }
    if (data.freePlacesCount.sitting !== 0) {
      tags.push(`Сидячие | ${data.freePlacesCount.sitting}`);
    }
    return tags;
  };

  return (
    <div className="box-case" onClick={() => navigate(`/flight/${data.id}`)}>
      <div className="header-box-case">
        <span>{data.train.name}</span>
        <div className="box-price">
          <Money />
          <p>от 500 р</p>
        </div>
      </div>
      <div className="body-train-card">
        <div className="box-places">
          <div className="place-item">
            <h1>07:00</h1>
            <p>{data.departureDate}</p>
            <p>{data.departurePoint}</p>
          </div>
          <div className="place-item">
            <h1>-</h1>
          </div>
          <div className="place-item">
            <h1>{data.arrivalTime}</h1>
            <p>{data.arrivalDate}</p>
            <p>{data.arrivalPoint}</p>
          </div>
        </div>
        <div className="box-free-place">
          <p>В пути:</p>
          <p>
            {Math.floor(data.travelTime / 60)} ч{" "}
            {data.travelTime - Math.floor(data.travelTime / 60) !== 0 &&
              data.travelTime - Math.floor(data.travelTime / 60) * 60 + "м"}
          </p>
        </div>

        <div className="box-free-place">
          <p>Cвободные места</p>
          <div className="box-list-tags">
            {getTags().map((tag) => (
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
