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
}

const CreateTest = ({
  isActive,
  setIsActive,
  isUpdate = false,
  info = null,
  orderId,
}: MonitoringModalProps) => {
  const select_correct = [
    { value: "singleResponse", label: "Вопросы с выбором единичного ответа" },
    {
      value: "multipleResponse",
      label: "Вопросы с выбором нескольких ответов",
    },
    { value: "detailedResponse", label: "Вопросы с развёрнутым ответом" },
    { value: "codeResponse", label: "Вопросы с кодом" },
  ];
  const [selectCorrect, setSelectCorrect] = useState(select_correct[0]);
  const [optionQuestion, setOptionQuestion] = useState();
  const { data: questions } = flightApi.useGetQuestionsQuery(
    selectCorrect.value
  );
  const [listQuestions, setListQuestions] = useState([]);
  const [name, setName] = useState("");

  const getQuestions = () => {
    return questions?.tasks?.map((item: any) => {
      return {
        value: item.id,
        label: item.question,
      };
    });
  };

  const [createTest] = flightApi.useCreateTestMutation();

  const [selectQa, setSelectQa] = useState(
    questions?.tasks?.map((item: any) => {
      return {
        value: item.id,
        label: item.question,
      };
    })[0]
  );

  useEffect(() => {
    if (questions !== undefined) {
      setSelectQa(
        questions?.tasks?.map((item: any) => {
          return {
            value: item.id,
            label: item.question,
          };
        })[0]
      );
    }
  }, [questions, selectCorrect]);

  useEffect(() => {
    console.log("=questions", questions);
  }, [questions]);

  if (questions?.tasks === undefined) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Cоздание теста"}
      className="monitoringModal"
    >
      <div className="box-content-create-test">
        <p>Название теста:</p>
        <input
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Категория задачи:</p>
        <CustomSelect
          value={selectCorrect}
          options={select_correct}
          onChange={setSelectCorrect}
          isHaveIcon={false}
          width={500}
          heightSelect={45}
          paddingIndicator={0}
          paddingContainer={12}
          backgroundColor={"#171226"}
          menuPlacement={"bottom"}
        />
        <p>Задачи:</p>
        {/* {String(selectQa?.value)} */}
        <CustomSelect
          key={questions?.tasks}
          value={selectQa}
          options={questions?.tasks?.map((item: any) => {
            return {
              value: item.id,
              label: item.question,
            };
          })}
          onChange={setSelectQa}
          isHaveIcon={false}
          width={600}
          heightSelect={45}
          paddingIndicator={0}
          paddingContainer={12}
          backgroundColor={"#171226"}
          menuPlacement={"bottom"}
        />
        <button
          className="btn lightBtn"
          onClick={() => {
            //@ts-ignore
            setListQuestions([
              //@ts-ignore
              ...listQuestions,
              //@ts-ignore
              { ...selectQa, cat: selectCorrect.label },
            ]);
          }}
        >
          Добавить вопрос
        </button>
        <div className="box-list-qa">
          <p>Вы добавили:</p>
          {listQuestions.map((item: any, index: number) => (
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <p>
                {index + 1 + ".  " + item?.label} || {item?.cat}
              </p>
              <p
                onClick={() => {
                  setListQuestions(
                    listQuestions.filter((it: any, ind: number) => {
                      return index !== ind;
                    })
                  );
                }}
              >
                ×
              </p>
            </div>
          ))}
        </div>
        <button
          className="btn lightBtn"
          onClick={() => {
            createTest({
              title: name,
              //@ts-ignore
              tasks: listQuestions?.map((item) => item?.value),
            });
          }}
        >
          Создать тест
        </button>
      </div>
    </Modal>
  );
};

export default CreateTest;
