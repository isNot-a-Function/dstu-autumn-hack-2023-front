import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { ReactComponent as Money } from "../../assets/img/money.svg";
import { useNavigate } from "react-router-dom";
import { getHours } from "../../utils/getHours";
import ScaleOnline from "../Footer/ScaleOnline";

interface CaseProps {
  id?: string;
  title: string;
  cost: number;
  costType: string;
  tags?: string[];
  rating: number;
  text?: string;
  isShowPrice?: boolean;
  isResponse?: boolean;
}
const User = ({
  title,
  cost,
  costType,
  text,
  rating,
  isShowPrice = false,
  isResponse = false,
}: CaseProps) => {
  const navigate = useNavigate();

  return (
    <div className="box-case">
      <div className="header-box-user">
        <span>{title}</span>
        <ScaleOnline rating={rating} maxPlayers={5} />
      </div>

      <div className="body-box-case">
        <div className="box-specializations">
          <p className="case-specialization">
            Мобильные приложения fdslkfmkdlsmf dsfmakdlsmfklsd fdsmfkldsmfkla
            fdsmfklds
          </p>
        </div>

        {isShowPrice && (
          <div className="box-price">
            <Money />
            <p>
              {cost === null
                ? "договорная"
                : costType === "inOrder"
                ? cost + "р за проект"
                : cost + "р / в час"}
            </p>
          </div>
        )}
      </div>
      {isResponse && (
        <div className="box-btn-in-user">
          <button className="btn btnInUser">СДЕЛАТЬ ИСПОЛНИТЕЛЕМ</button>
        </div>
      )}
    </div>
  );
};

export default User;
