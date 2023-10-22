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

const TestModal1 = ({
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

  const [result, setResult] = useState<any[] | undefined>(undefined);

  const [q1, setq1] = useState("");
  const [q2, setq2] = useState("");
  const [q3, setq3] = useState("");
  const [q4, setq4] = useState<string[]>([]);
  const [q5, setq5] = useState<string[]>([]);
  const [q6, setq6] = useState<string[]>([]);
  const [q7, setq7] = useState<string[]>([]);
  const [q8, setq8] = useState("");
  const [q9, setq9] = useState("");
  const [q10, setq10] = useState("");

  if (data === undefined || isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Пройти тестирование"}
      className="monitoringModal"
    >
      <div className="box-content-create-test">
        <div className="box-qa">
          <p>{data?.test?.tasks[0].question}</p>
          <p></p>
          <CustomSelect
            value={data?.test?.tasks[0].variants
              .map((it: any, index: any) => {
                return { label: it, value: index };
              })
              .filter((y: any) => y.value === q1)}
            options={data?.test?.tasks[0].variants.map(
              (it: any, index: any) => {
                return { label: it, value: index };
              }
            )}
            onChange={(e) => {
              setq1(e.value);
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
        <div className="box-qa">
          <p>{data?.test?.tasks[1].question}</p>
          <p></p>
          <CustomSelect
            value={data?.test?.tasks[1].variants
              .map((it: any, index: any) => {
                return { label: it, value: index };
              })
              .filter((y: any) => y.value === q2)}
            options={data?.test?.tasks[1].variants.map(
              (it: any, index: any) => {
                return { label: it, value: index };
              }
            )}
            onChange={(e) => {
              setq2(e.value);
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
        <div className="box-qa">
          <p>{data?.test?.tasks[2].question}</p>
          <p></p>
          <CustomSelect
            value={data?.test?.tasks[2].variants
              .map((it: any, index: any) => {
                return { label: it, value: index };
              })
              .filter((y: any) => y.value === q3)}
            options={data?.test?.tasks[2].variants.map(
              (it: any, index: any) => {
                return { label: it, value: index };
              }
            )}
            onChange={(e) => {
              setq3(e.value);
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
        <div className="box-qa">
          <p>{data?.test?.tasks[3].question}</p>
          <div className="box-checkbox-test">
            <input
              type="checkbox"
              //@ts-ignore
              checked={q4.includes("0")}
              onChange={(e) => {
                //@ts-ignore
                if (q4.includes("0")) {
                  setq4(q4.filter((it) => it !== "0"));
                } else {
                  //@ts-ignore
                  setq4([...q4, "0"]);
                }
              }}
            ></input>
            {data?.test?.tasks[3].variants[0]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              //@ts-ignore
              checked={q4.includes("1")}
              onChange={(e) => {
                //@ts-ignore
                if (q4.includes("1")) {
                  setq4(q4.filter((it) => it !== "1"));
                } else {
                  //@ts-ignore
                  setq4([...q4, "1"]);
                }
              }}
            ></input>
            {data?.test?.tasks[3].variants[1]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              //@ts-ignore
              checked={q4.includes("2")}
              onChange={(e) => {
                //@ts-ignore
                if (q4.includes("2")) {
                  setq4(q4.filter((it) => it !== "2"));
                } else {
                  //@ts-ignores
                  setq4([...q4, "2"]);
                }
              }}
            ></input>
            {data?.test?.tasks[3].variants[2]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              //@ts-ignore
              checked={q4.includes("3")}
              onChange={(e) => {
                //@ts-ignore
                if (q4.includes("3")) {
                  setq4(q4.filter((it) => it !== "3"));
                } else {
                  //@ts-ignores
                  setq4([...q4, "3"]);
                }
              }}
            ></input>
            {data?.test?.tasks[3].variants[3]}
          </div>
        </div>

        <div className="box-qa">
          <p>{data?.test?.tasks[4].question}</p>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q5.includes("0")}
              onChange={(e) => {
                if (q5.includes("0")) {
                  setq5(q5.filter((it) => it !== "0"));
                } else {
                  setq5([...q5, "0"]);
                }
              }}
            ></input>
            {data?.test?.tasks[4].variants[0]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q5.includes("1")}
              onChange={(e) => {
                if (q5.includes("1")) {
                  setq5(q5.filter((it) => it !== "1"));
                } else {
                  setq5([...q5, "1"]);
                }
              }}
            ></input>
            {data?.test?.tasks[4].variants[1]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q5.includes("2")}
              onChange={(e) => {
                if (q5.includes("2")) {
                  setq5(q5.filter((it) => it !== "2"));
                } else {
                  setq5([...q5, "2"]);
                }
              }}
            ></input>
            {data?.test?.tasks[4].variants[2]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q5.includes("3")}
              onChange={(e) => {
                if (q5.includes("3")) {
                  setq5(q5.filter((it) => it !== "3"));
                } else {
                  setq5([...q5, "3"]);
                }
              }}
            ></input>
            {data?.test?.tasks[4].variants[3]}
          </div>
        </div>

        <div className="box-qa">
          <p>{data?.test?.tasks[5].question}</p>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q6.includes("0")}
              onChange={(e) => {
                if (q6.includes("0")) {
                  setq6(q6.filter((it) => it !== "0"));
                } else {
                  setq6([...q6, "0"]);
                }
              }}
            ></input>
            {data?.test?.tasks[5].variants[0]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q6.includes("1")}
              onChange={(e) => {
                if (q6.includes("1")) {
                  setq6(q6.filter((it) => it !== "1"));
                } else {
                  setq6([...q6, "1"]);
                }
              }}
            ></input>
            {data?.test?.tasks[5].variants[1]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q6.includes("2")}
              onChange={(e) => {
                if (q6.includes("2")) {
                  setq6(q6.filter((it) => it !== "2"));
                } else {
                  setq6([...q6, "2"]);
                }
              }}
            ></input>
            {data?.test?.tasks[5].variants[2]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q6.includes("3")}
              onChange={(e) => {
                if (q6.includes("3")) {
                  setq6(q6.filter((it) => it !== "3"));
                } else {
                  setq6([...q6, "3"]);
                }
              }}
            ></input>
            {data?.test?.tasks[5].variants[3]}
          </div>
        </div>

        <div className="box-qa">
          <p>{data?.test?.tasks[6].question}</p>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q7.includes("0")}
              onChange={(e) => {
                if (q7.includes("0")) {
                  setq7(q7.filter((it) => it !== "0"));
                } else {
                  setq7([...q7, "0"]);
                }
              }}
            ></input>
            {data?.test?.tasks[6].variants[0]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q7.includes("1")}
              onChange={(e) => {
                if (q7.includes("1")) {
                  setq7(q7.filter((it) => it !== "1"));
                } else {
                  setq7([...q7, "1"]);
                }
              }}
            ></input>
            {data?.test?.tasks[6].variants[1]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q7.includes("2")}
              onChange={(e) => {
                if (q7.includes("2")) {
                  setq7(q7.filter((it) => it !== "2"));
                } else {
                  setq7([...q7, "2"]);
                }
              }}
            ></input>
            {data?.test?.tasks[6].variants[2]}
          </div>

          <div className="box-checkbox-test">
            <input
              type="checkbox"
              checked={q7.includes("3")}
              onChange={(e) => {
                if (q7.includes("3")) {
                  setq7(q7.filter((it) => it !== "3"));
                } else {
                  setq7([...q7, "3"]);
                }
              }}
            ></input>
            {data?.test?.tasks[6].variants[3]}
          </div>
        </div>
        <div className="box-qa">
          <p>{data?.test?.tasks[7]?.question}</p>
          <input
            className="input"
            style={{ width: "100%" }}
            value={q8}
            onChange={(e) => {
              setq8(e.target.value);
            }}
          />
        </div>
        <div className="box-qa">
          <p>{data?.test?.tasks[8]?.question}</p>
          <input
            className="input"
            value={q9}
            onChange={(e) => {
              setq9(e.target.value);
            }}
          />
        </div>
        <div className="box-qa">
          <p>{data?.test?.tasks[9]?.question}</p>
          <input
            className="input"
            value={q10}
            onChange={(e) => {
              setq10(e.target.value);
            }}
          />
        </div>
        <button
          className="btn lightBtn"
          onClick={() => {
            saveQa({
              testId: Number(testId),
              directionId: Number(directionId),
              answers: [
                //@ts-ignore
                [q1],
                //@ts-ignore
                [q2],
                //@ts-ignore
                [q3],
                q4.map((it) => Number(it)),
                q5.map((it) => Number(it)),
                q6.map((it) => Number(it)),
                q7.map((it) => Number(it)),
                q8,
                q9,
                q10,
              ],
            });
          }}
        >
          Отослать тест
        </button>
      </div>
    </Modal>
  );
};

export default TestModal1;
