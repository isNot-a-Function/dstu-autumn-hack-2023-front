import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Eye } from "../../assets/img/eye.svg";
import { ReactComponent as Speech } from "../../assets/img/speech.svg";
import { ReactComponent as Time } from "../../assets/img/time.svg";
import { ReactComponent as Money } from "../../assets/img/money.svg";

const Case = () => {
  return (
    <div className="box-case">
      <div className="header-box-case">
        <span>
          Убрать баг в форме с картой на реакте вызываемой web app телеграмм
          sfбрать баг в форме с картой на реакте вызываемой web app телеграмм
        </span>
      </div>
      <div className="box-list-tags">
        <p className="box-tags">React</p>
        <p className="box-tags"> React</p>
        {/* <p className="box-tags">
          Убрать баг в форме с картой на реакте вызываемой web app телеграммжжжж
        </p>
        <p className="box-tags">
          Убрать баг в форме с картой на реакте вызываемой web app телеграммжжжж
        </p> */}
      </div>
      <div className="body-box-case">
        <div className="base-value-case">
          <div className="item-base-value-case">
            <div className="value-case">
              <Eye />
              <p>120</p>
            </div>
            <p>просмотров</p>
          </div>
          <div className="item-base-value-case">
            <div className="value-case">
              <Speech />
              <p>120</p>
            </div>
            <p>откликов</p>
          </div>
          <div className="item-base-value-case">
            <div className="value-case">
              <Time />
              <p>120 ч</p>
            </div>
            <p>назад</p>
          </div>
        </div>
        {/* <div className="box-specializations">
          <p className="case-specialization">Мобильные приложения</p>
        </div> */}
        <div className="box-price">
          <Money />
          <p>договорная</p>
        </div>
      </div>
    </div>
  );
};

export default Case;
