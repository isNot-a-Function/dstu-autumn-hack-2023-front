import React, { useState, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";
import { ReactComponent as Trash } from "../assets/img/trashSort.svg";
import TrainCard from "../components/Main/Case";
import { flightApi } from "../store";
import Pagination from "../components/Pagination/Pagination";
import CreateCaseModal from "../components/Main/CreateCaseModal";
import ReactDatePicker from "react-datepicker";
import CustomSelect from "../components/UI/CustomSelect";
import "../assets/scss/pages/_trainee.scss";
import Case from "../components/Main/Case";

const ResponsesTrainee = () => {
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined
  );
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { data: responses } = flightApi.useGetResponsesQuery({
    //@ts-ignore
    sp: activeSection,
    type: "internship",
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
            link={`/responses/trainee/${item.id}`}
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

export default ResponsesTrainee;
