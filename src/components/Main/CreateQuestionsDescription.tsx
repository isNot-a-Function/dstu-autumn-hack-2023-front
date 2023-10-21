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

const CreateQuestionsDescription = ({
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

export default CreateQuestionsDescription;
