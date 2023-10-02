import React from "react";
import "../assets/scss/pages/_deal.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";

const Deal = () => {
  const tags = [
    "Vue",
    "React",
    "NodeJS",
    "PHP",
    "Vue",
    "React",
    "NodeJS",
    "PHP",
    "Vue",
    "React",
    "NodeJS",
    "PHP",
  ];
  return (
    <div className="box-deal-page container">
      <div className="body-deal-page">
        <div className="content-deal-page ">
          <h1 className="header-deal-page">
            Убрать баг в форме с картой на реакте вызываемой web app телеграмм
            sfбрать баг в форме с картой на реакте вызываемой web app телеграмм
          </h1>
          <div className="box-list-tags">
            {tags.map((tag) => (
              <p className="box-tags" key={tag}>
                {tag}
              </p>
            ))}
          </div>
          <div className="description-deal-page">
            <p>Описание:</p>
            <p>
              Минут через десять Тарвин начал догадываться, что все эти усталые,
              измученные люди представляли интересы полдюжины различных фирм
              Калькутты и Бомбея. Как и каждую весну, они без всякой надежды на
              успех осаждали королевский дворец, пытаясь получить хоть что-то по
              счетам с должника, которым был сам король. Его Величество
              заказывал все подряд, без разбору, и в огромных количествах —
              расплачиваться же за покупки очень не любил.
            </p>
          </div>
          <div className="box-files">
            <p>Прикриплённые файлы:</p>
            <a href="/test1.png" download>
              <div className="link-download">
                <Download />
                <p>Cкачать файл</p>
              </div>
            </a>
            <a href="/test1.png" download>
              <div className="link-download">
                <Download />
                <p>Cкачать файл</p>
              </div>
            </a>
            <a href="/test1.png" download>
              <div className="link-download">
                <Download />
                <p>Cкачать файл</p>
              </div>
            </a>
          </div>
          <div className="box-price-deal">
            <p>Cтоимость: 5000р/час</p>
          </div>
        </div>
        <button className="lightBtn btn">Оставить отклик</button>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> ЗАКАЗЧИК</p>
          <div className="box-avatar-in-deal">
            <Avatar />
            <p>MIRONUXA</p>
          </div>
          <div className="box-rating">
            <ScaleOnline rating={4.3} maxPlayers={5} />
          </div>
        </div>
        <div className="info-of-customer">
          <p>СПЕЦИАЛИЗАЦИЯ</p>
          <p>Мобильное приложение</p>
        </div>
        <div className="box-dop-info-mini">
          <div className="box-list-item-dop-info">
            <div className="item-dop-info">
              <Eye />
              <p>800 просмотров</p>
            </div>
            <div className="item-dop-info">
              <Speech />
              <p>120 откликов</p>
            </div>
            <div className="item-dop-info">
              <Time />
              <p>5 ч назад</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
