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
}

const CreateCaseModal = ({ isActive, setIsActive }: MonitoringModalProps) => {
  const [createCase, {}] = casesApi.useCreateOrderMutation();
  const { data: specializationsInServer, isLoading } =
    casesApi.useGetSpecializationsQuery();
  const select_cost_type = [
    {
      value: "inHour",
      label: "почасовая",
    },
    {
      value: "contract",
      label: "договорная",
    },
    {
      value: "inOrder",
      label: "за проект",
    },
  ];
  const select_specializations = () => {
    return specializationsInServer
      ? specializationsInServer?.specializations.map((item) => {
          return {
            value: item.title,
            label: item.title,
          };
        })
      : [];
  };

  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const [costType, setCostType] = useState(select_cost_type[0]);
  const [specializations, setSpecializations] = useState(
    select_specializations()[0]
  );

  const handleFileChange = (e: any) => {
    //@ts-ignore
    setFileList([...fileList, ...e.target.files]);
  };

  //   useEffect(() => {
  //     console.log("values.tags", values.tags.split(","));
  //   }, [values.tags]);

  if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Cоздание заказа"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{ name: "", tags: "", cost: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                //@ts-ignore
                errors.name = "Заполните имя";
              } else if (costType.value !== "contract" && !values.cost) {
                //@ts-ignore
                errors.name =
                  "При таком формате работы необходимо указать стоимость заказа";
              }
              if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
                //@ts-ignore
                errors.name =
                  "Для создания тегов используйте русские и латинские буквы, а также запятую";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("fileLiat", fileList);
              createCase({
                title: values.name,
                description: description,
                files: fileList,
                tags: values.tags.split(",").map((it) => it.trim()),
                costType: costType.value,
                cost: values.cost,
                specialization: specializations.value,
              });
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
                <div>
                  <p>НАЗВАНИЕ</p>
                  <input
                    type="string"
                    name="name"
                    className="input"
                    onChange={handleChange}
                    value={values.name}
                  />
                </div>

                <div>
                  <p>ОПИСАНИЕ</p>
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
                  <p>ФАЙЛЫ</p>
                  <input
                    type="file"
                    name="files"
                    className="input"
                    onChange={handleFileChange}
                  />
                  <ul style={{ paddingTop: 12 }}>
                    {fileList.map((file: any, i: any) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p>CПЕЦИАЛИЗАЦИЯ</p>

                  <CustomSelect
                    value={specializations}
                    options={select_specializations()}
                    onChange={setSpecializations}
                    isHaveIcon={false}
                    width={"100%"}
                    heightSelect={45}
                    paddingIndicator={0}
                    paddingContainer={12}
                    backgroundColor={"#171226"}
                    menuPlacement={"bottom"}
                  />
                </div>

                <div>
                  <p>ТЭГИ(введите через запятую)</p>
                  <input
                    type="string"
                    name="tags"
                    className="input"
                    onChange={handleChange}
                    value={values.tags}
                  />
                </div>

                <div>
                  <p>СТОИМОСТЬ</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <input
                      type="string"
                      name="cost"
                      className="input"
                      onChange={handleChange}
                      style={{ width: "50%" }}
                      value={values.cost}
                    />
                    <CustomSelect
                      value={costType}
                      options={select_cost_type}
                      onChange={setCostType}
                      isHaveIcon={false}
                      width={"50%"}
                      heightSelect={45}
                      paddingIndicator={0}
                      paddingContainer={12}
                      backgroundColor={"#171226"}
                      menuPlacement={"top"}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lightBtn btn"
                >
                  {"CОЗДАТЬ ЗАКАЗ"}
                </button>
                {errors.name && touched.name && errors.name}
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default CreateCaseModal;
