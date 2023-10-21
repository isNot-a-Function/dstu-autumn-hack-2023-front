import "../../assets/scss/components/main/_case.scss";
import { ReactComponent as Trash } from "../../assets/img/trash.svg";
import { flightApi } from "../../store";
import { useEffect, useState } from "react";

interface MenuProps {
  activeSection: string[];
  setActiveSection: (value: string[]) => void;
  openSection: number | null;
  setOpenSection: (value: number | null) => void;
}
const Menu = ({
  activeSection,
  setActiveSection,
  openSection,
  setOpenSection,
}: MenuProps) => {
  const { data: specializations } = flightApi.useGetSpecializationsQuery();
  const listSection = [
    "BackEnd",
    "FrontEnd",
    "DevOps",
    "Системная аналитика",
    "Разработчик баз данных",
  ];

  const handlerOpenSubSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="list-filter">
      <div className="header-box-filter">
        <h1>CПЕЦИАЛИЗАЦИИ</h1>
      </div>

      {listSection?.map((section: any, index: number) => {
        return (
          <div key={index}>
            <p
              key={index}
              className={`
               active-section-list-filter section-list-filter
              `}
            >
              <div
                onClick={() => setActiveSection(section)}
                className={`${
                  activeSection === section ? "active-flag-section" : ""
                } flag-section`}
              >
                {/* {checkArray(
                  section.subsections.map((e: any) => e.title),
                  activeSection
                ) === 1 && <div className="active-flag-center"></div>} */}
              </div>
              <div onClick={() => handlerOpenSubSection(section)}>
                {section}
              </div>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
