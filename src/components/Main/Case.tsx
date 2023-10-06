import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { ReactComponent as Money } from "../../assets/img/money.svg";
import { useNavigate } from "react-router-dom";
import { getHours } from "../../utils/getHours";

interface CaseProps {
  id: string;
  title: string;
  createdAt: string;
  views: number;
  cost: number;
  costType: string;
  responsesCount: number;
  tags: string[];
}
const Case = ({
  id,
  title,
  createdAt,
  views,
  cost,
  costType,
  responsesCount,
  tags,
}: CaseProps) => {
  const navigate = useNavigate();

  return (
    <div className="box-case" onClick={() => navigate(`/order/${id}`)}>
      <div className="header-box-case">
        <span>{title}</span>
      </div>
      <div className="box-list-tags">
        {tags.map((tag) => (
          <p className="box-tags" key={tag}>
            {tag}
          </p>
        ))}
      </div>
      <div className="body-box-case">
        <div className="base-value-case">
          <div className="item-base-value-case">
            <div className="value-case">
              <Eye />
              <p>{views}</p>
            </div>
            <p>просмотров</p>
          </div>
          <div className="item-base-value-case">
            <div className="value-case">
              <Speech />
              <p>{responsesCount}</p>
            </div>
            <p>откликов</p>
          </div>
          <div className="item-base-value-case">
            <div className="value-case">
              <Time />
              <p>{getHours(createdAt)} ч</p>
            </div>
            <p>назад</p>
          </div>
        </div>
        {/* <div className="box-specializations">
          <p className="case-specialization">Мобильные приложения</p>
        </div> */}
        <div className="box-price">
          <Money />
          <p>
            {costType == "contract"
              ? "договорная"
              : costType === "inOrder"
              ? cost + "р за проект"
              : cost + "р / в час"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Case;
