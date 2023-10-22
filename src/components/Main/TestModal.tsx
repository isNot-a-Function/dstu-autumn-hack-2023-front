import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { topUpMonitoringServers } from "../../consts/modal";
import { Formik, Field, useFormik, FormikProvider } from "formik";

import CustomSelect from "../UI/CustomSelect";
import Loader from "../Loader";
import { flightApi } from "../../store";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  isUpdate?: boolean;
  info?: any;
  children?: React.ReactNode;
  orderId?: string;
  testId: string | number;
  directionId: string | number;
}

const TestModal = ({
  isActive,
  setIsActive,
  isUpdate = false,
  info = null,
  orderId,
  testId,
  directionId,
}: MonitoringModalProps) => {
  // console.log("testId", testId);

  const { data, isLoading } = flightApi.useGetTestQuery(testId);
  const [saveQa] = flightApi.useSaveQaMutation();
  // console.log("test", test);

  const select_correct = [
    { value: "singleResponse", label: "Вопросы с выбором единичного ответа" },
    {
      value: "multipleResponse",
      label: "Вопросы с выбором нескольких ответов",
    },
    { value: "detailedResponse", label: "Вопросы с развёрнутым ответом" },
    { value: "codeResponse", label: "Вопросы с кодом" },
  ];
  // const [selectCorrect, setSelectCorrect] = useState(select_correct[0]);
  const [optionQuestion, setOptionQuestion] = useState();

  const [listQuestions, setListQuestions] = useState([]);
  const [name, setName] = useState("");

  const [createTest] = flightApi.useCreateTestMutation();

  const [result, setResult] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    if (data !== undefined) {
      setResult(
        data?.test?.tasks.map((item: any) => {
          if (item.type === "multipleResponse") {
            return [false, false, false, false];
          } else if (item.type === "singleResponse") {
            return [0];
          } else {
            return "1";
          }
        })
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log("result", result);
  }, [result]);

  if (data === undefined || isLoading || result === undefined)
    return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Пройти тестирование"}
      className="monitoringModal"
    >
      <div className="box-content-create-test">
        {data?.test?.tasks.map((item: any, index: number) => {
          if (item.type === "multipleResponse") {
            return (
              <div className="box-qa">
                <p>{index + 1 + ") " + item.question}</p>
                <div className="box-checkbox-test">
                  <input
                    type="checkbox"
                    value={result[index][0]}
                    onChange={(e) => {
                      let r = result[index];
                      r[0] = !result[index][0];
                      let t = result;
                      t[index] = r;
                      setResult(t);
                    }}
                  ></input>
                  {item.variants[0]}
                </div>

                <div className="box-checkbox-test">
                  <input
                    type="checkbox"
                    value={result[index][1]}
                    onChange={(e) => {
                      let r = result[index];
                      r[1] = !result[index][1];
                      let t = result;
                      t[index] = r;
                      setResult(t);
                    }}
                  ></input>
                  {item.variants[1]}
                </div>

                <div className="box-checkbox-test">
                  <input
                    type="checkbox"
                    value={result[index][2]}
                    onChange={(e) => {
                      let r = result[index];
                      r[2] = !result[index][2];
                      let t = result;
                      t[index] = r;
                      setResult(t);
                    }}
                  ></input>
                  {item.variants[2]}
                </div>

                <div className="box-checkbox-test">
                  <input
                    type="checkbox"
                    value={result[index][3]}
                    onChange={(e) => {
                      let r = result[index];
                      r[3] = !result[index][3];

                      let t = result;
                      t[index] = r;
                      setResult(t);
                    }}
                  ></input>
                  {item.variants[3]}
                </div>
              </div>
            );
          } else if (item.type === "singleResponse") {
            console.log(
              `{String(
              item.variants
                .map((it: any, ind: any) => {
                  return { label: it, value: ind };
                })
                .filter((y: any) => y.value === result[index])
            )}`,
              item.variants
                .map((it: any, ind: any) => {
                  return { label: it, value: ind };
                })
                .filter((y: any) => y.value === result[index][0])
            );
            return (
              <div className="box-qa">
                <p>{index + 1 + ") " + item.question}</p>
                <p></p>
                <CustomSelect
                  value={
                    item.variants
                      .map((it: any, ind: any) => {
                        return { label: it, value: ind };
                      })
                      .filter((y: any) => y.value === result[index])[0]
                  }
                  options={item.variants.map((it: any, index: any) => {
                    return { label: it, value: index };
                  })}
                  onChange={(e) => {
                    let r = result;
                    console.log("e.value", e.value);
                    r[index] = [e.value];

                    setResult(r);
                  }}
                  isHaveIcon={false}
                  width={500}
                  heightSelect={45}
                  paddingIndicator={0}
                  paddingContainer={12}
                  backgroundColor={"#171226"}
                  menuPlacement={"bottom"}
                />
              </div>
            );
          } else {
            console.log("result[index]", result[index]);
            return (
              <div className="box-qa">
                <p>{index + 1 + ") " + item.question}</p>

                <p>{result[index]}</p>
                <input
                  name={`${index}`}
                  className="input"
                  value={result[index]}
                  onChange={(e) => {
                    let r = result;
                    r[index] = e.target.value;
                    console.log("res", r);
                    setResult(r);
                  }}
                />
              </div>
            );
          }
        })}

        <button
          className="btn lightBtn"
          onClick={() => {
            saveQa({
              testId: Number(testId),
              directionId: Number(directionId),
              answers: result.map((el) => {
                if (Array.isArray(el) && el.length > 0) {
                  const w: any[] = [];
                  el.map((rec, num) => {
                    if (rec) {
                      w.push(num);
                    }
                  });
                  return w;
                } else {
                  return el;
                }
              }),
            });
          }}
        >
          Отослать тест
        </button>
      </div>
    </Modal>
  );
};

export default TestModal;
