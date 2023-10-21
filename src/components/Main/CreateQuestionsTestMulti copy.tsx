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

const CreateQuestionsTestMulti = ({
  isActive,
  setIsActive,
  isUpdate = false,
  info = null,
  orderId,
}: MonitoringModalProps) => {
  const select_correct = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const [createTask] = flightApi.useCreateTaskMutation();
  const [selectCorrect, setSelectCorrect] = useState(select_correct[0]);
  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Cоздание вопроса"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{
              name: "",
              qa1: "",
              qa2: "",
              qa3: "",
              qa4: "",
              qa1Check: false,
              qa2Check: false,
              qa3Check: false,
              qa4Check: false,
            }}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.name) {
            //     //@ts-ignore
            //     errors.name = "Заполните имя";
            //   }
            //   console.log("errors", errors);
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              createTask({
                type: "multipleResponse",
                question: values.name,
                variants: [values.qa1, values.qa2, values.qa3, values.qa4],
                //@ts-ignore
                correctAnswer: [
                  values.qa1Check,
                  values.qa2Check,
                  values.qa3Check,
                  values.qa4Check,
                ]
                  .map((item, index) => {
                    if (item) {
                      return index + 1;
                    }
                  })
                  .filter((item) => item !== undefined),
              });
              setIsActive(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="box-form-create-case-modal"
              >
                <>
                  <div>
                    <p>ВОПРОС</p>
                    <input
                      type="string"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>

                  <div>
                    <p>ОТВЕТ 1</p>

                    <textarea
                      name={"qa1"}
                      id="qa1"
                      rows={4}
                      className="textarea-description"
                      onChange={handleChange}
                      value={values.qa1}
                    ></textarea>
                    <div className="box-checkbox">
                      <p>Является ли верным</p>
                      <p>
                        <input
                          type="checkbox"
                          name="qa1Check"
                          checked={values.qa1Check}
                          onChange={handleChange}
                        />
                      </p>
                    </div>
                  </div>

                  <div>
                    <p>ОТВЕТ 2</p>
                    <textarea
                      name={"qa2"}
                      id="qa2"
                      rows={4}
                      className="textarea-description"
                      onChange={handleChange}
                      value={values.qa2}
                    ></textarea>
                    <div className="box-checkbox">
                      <p>Является ли верным</p>
                      <p>
                        <input
                          type="checkbox"
                          name="qa2Check"
                          checked={values.qa2Check}
                          onChange={handleChange}
                        />
                      </p>
                    </div>
                  </div>

                  <div>
                    <p>ОТВЕТ 3</p>
                    <textarea
                      name={"qa3"}
                      id="qa3"
                      rows={4}
                      className="textarea-description"
                      onChange={handleChange}
                      value={values.qa3}
                    ></textarea>
                    <div className="box-checkbox">
                      <p>Является ли верным</p>
                      <p>
                        <input
                          type="checkbox"
                          name="qa3Check"
                          checked={values.qa3Check}
                          onChange={handleChange}
                        />
                      </p>
                    </div>
                  </div>

                  <div>
                    <p>ОТВЕТ 4</p>
                    <textarea
                      name={"qa4"}
                      id="qa4"
                      rows={4}
                      className="textarea-description"
                      onChange={handleChange}
                      value={values.qa4}
                    ></textarea>
                    <div className="box-checkbox">
                      <p>Является ли верным</p>
                      <p>
                        <input
                          type="checkbox"
                          name="qa4Check"
                          checked={values.qa4Check}
                          onChange={handleChange}
                        />
                      </p>
                    </div>
                  </div>

                  {/* <div>
                    <p>ПРАВИЛЬНЫЙ ОТВЕТ</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CustomSelect
                        value={selectCorrect}
                        options={select_correct}
                        onChange={setSelectCorrect}
                        isHaveIcon={false}
                        width={"50%"}
                        heightSelect={45}
                        paddingIndicator={0}
                        paddingContainer={12}
                        backgroundColor={"#171226"}
                        menuPlacement={"top"}
                      />
                    </div>
                  </div> */}

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    СОЗДАТЬ ВОПРОС
                  </button>
                  {errors.name && touched.name && errors.name}
                </>
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default CreateQuestionsTestMulti;
