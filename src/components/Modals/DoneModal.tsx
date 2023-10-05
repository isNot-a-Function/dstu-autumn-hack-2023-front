import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { topUpMonitoringServers } from "../../consts/modal";
import { Formik, Field, useFormik, FormikProvider } from "formik";

import CustomSelect from "../UI/CustomSelect";
import Loader from "../Loader";
import { casesApi } from "../../store";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  isExecutor?: boolean;
  info?: any;
  children?: React.ReactNode;
  orderId?: string;
}

const DoneModal = ({
  isActive,
  setIsActive,
  isExecutor = true,
  info = null,
  orderId,
}: MonitoringModalProps) => {
  const [done] = casesApi.useDoneExecutorMutation();
  const [approve] = casesApi.useCustomerApproveMutation();

  const select_cost_type = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
  ];
  const [rating, setRating] = useState(
    select_cost_type[select_cost_type.length - 1]
  );

  const [description, setDescription] = useState(
    info === null ? "" : info.description
  );

  // if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Подтвердите успешное выполнение заказа"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{}}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.name) {
            //     //@ts-ignore
            //     errors.name = "Заполните имя";
            //   }
            //   if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
            //     //@ts-ignore
            //     errors.name =
            //       "Для создания тегов используйте русские и латинские буквы, а также запятую";
            //   }
            //   console.log("errors", errors);
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              isExecutor
                ? done({
                    orderId: String(orderId),
                    comment: description,
                    rating: Number(rating.value),
                  })
                : approve({
                    orderId: String(orderId),
                    comment: description,
                    rating: Number(rating.value),
                  })
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
                    <p>КОММЕНТАРИЙ</p>
                    <textarea
                      name={"description"}
                      id="description"
                      rows={4}
                      className="textarea-description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                  </div>

                  <div>
                    <p>ОЦЕНКА {isExecutor ? "ЗАКАЗЧИКА" : "ИСПОЛНИТЕЛЯ"}</p>

                    <CustomSelect
                      value={rating}
                      options={select_cost_type}
                      onChange={setRating}
                      isHaveIcon={false}
                      width={"100%"}
                      heightSelect={45}
                      paddingIndicator={0}
                      paddingContainer={12}
                      backgroundColor={"#171226"}
                      menuPlacement={"bottom"}
                    />
                  </div>

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    ПОДТВЕРДИТЬ
                  </button>
                  {/* {errors.name && touched.name && errors.name} */}
                </>
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default DoneModal;
