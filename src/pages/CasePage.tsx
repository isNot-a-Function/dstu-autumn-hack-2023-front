import { flightApi } from "../store";
import Loader from "../components/Loader";

const CasePage = () => {
  const caseId = window.location.pathname
    .replace("/trainee/", "")
    .replace("/practice/", "");
  const { data: task } = flightApi.useGetTaskQuery({ id: caseId });
  const [send] = flightApi.useLazySendPracticeQuery();

  if (task === undefined) return <Loader />;
  return (
    <div className="container box-case-page">
      <div className="title-case-page">
        <h1>{task?.direction?.title}</h1>
      </div>
      <div className="box-tags-case-page">
        <p className="box-tags">{task?.direction?.specialization?.title}</p>
      </div>
      <div className="description-case-page">
        {" "}
        <p>{task?.direction?.description}</p>
      </div>
      <button
        className="lightBtn btn"
        onClick={() => {
          send(caseId);
        }}
      >
        ЗАПИСАТЬСЯ
      </button>
    </div>
  );
};

export default CasePage;
