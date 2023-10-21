import { flightApi } from "../store";

const CasePage = () => {
  const caseId = window.location.pathname
    .replace("/trainee/", "")
    .replace("/practice/", "");
  const { data: task } = flightApi.useGetTaskQuery({ id: caseId });
  return (
    <div className="container box-case-page">
      <div className="title-case-page">
        <h1>{task?.direction?.title}</h1>
      </div>
      <div className="box-tags-case-page">
        <p className="box-tags">React</p>
      </div>
      <div className="description-case-page">
        {" "}
        <p>{task?.direction?.description}</p>
      </div>
      <button className="lightBtn btn">ПРОЙТИ ТЕСТИРОВАНИЕ</button>
    </div>
  );
};

export default CasePage;
