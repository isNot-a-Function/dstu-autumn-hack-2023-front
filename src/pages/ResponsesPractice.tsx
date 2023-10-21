import React, { useState, useEffect } from "react";
import Menu from "../components/Main/Menu";
import { flightApi } from "../store";
import "../assets/scss/pages/_trainee.scss";
import Case from "../components/Main/Case";

const ResponsesPractice = () => {
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined
  );
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { data: responses } = flightApi.useGetResponsesQuery({
    //@ts-ignore
    sp: activeSection,
    type: "practice",
  });

  return (
    <div className="box-trainee-page container">
      <div className="box-list-cases">
        {responses?.responses?.map((item: any) => (
          <Case
            title={
              item.user.id +
              " " +
              (item.user.fullname !== null ? item.user.fullname : "")
            }
            tags={item?.direction?.specialization.title}
            id={item.id}
            link={`/responses/practice/${item.id}`}
          />
        ))}
      </div>

      <div style={{ paddingRight: 12, top: 80 }}>
        <Menu
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          openSection={openSection}
          setOpenSection={setOpenSection}
        />
      </div>
    </div>
  );
};

export default ResponsesPractice;
