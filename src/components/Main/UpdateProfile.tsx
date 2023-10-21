import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { topUpMonitoringServers } from "../../consts/modal";
import { Formik, Field, useFormik, FormikProvider } from "formik";

import CustomSelect from "../UI/CustomSelect";
import Loader from "../Loader";
import { flightApi, userApi } from "../../store";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  isExecutor?: boolean;
}

const UpdateProfileModal = ({
  isActive,
  setIsActive,
}: MonitoringModalProps) => {
  const [updateUser] = userApi.useUpdateUserMutation();
  const [checkFile, { data: link, isSuccess }] =
    flightApi.useCheckFileMutation();
  const [linkFiles, setLinkFiles] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);

  const handleFileChange = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    checkFile(formData).then((data: any) => {
      console.log("data", data);
      if (data?.data.files !== undefined) {
        setFileList([...fileList, ...e.target.files]);
        setLinkFiles([...linkFiles, ...data?.data.files]);
      }
    });
  };
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

  // if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Изменение профиля"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{
              name: "",
              vk: "",
              tg: "",
              family: "",
              email: "",
              phone: "",
              fullname: "",
            }}
            // validate={(values) => {
            //   const errors = {};
            //   // if (!values.name) {
            //   //   //@ts-ignore
            //   //   errors.name = "Заполните имя";
            //   // }
            //   if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
            //     //@ts-ignore
            //     errors.name =
            //       "Для создания тегов используйте русские и латинские буквы, а также запятую";
            //   }
            //   console.log("errors", errors);
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("linkFiles[0]", linkFiles);
              updateUser({
                tgLink: values.tg,
                vkLink: values.vk,
                phone: values.phone,
                fullname: values.name,
                logo: linkFiles[0],
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
                    <p>ИМЯ И ФАМИЛИЯ</p>
                    <input
                      type="string"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>

                  <div>
                    <p>ТЕЛЕФОН</p>
                    <input
                      type="phone"
                      name="phone"
                      className="input"
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </div>

                  <div>
                    <p>TELEGRAM</p>
                    <input
                      type="tg"
                      name="tg"
                      className="input"
                      onChange={handleChange}
                      value={values.tg}
                    />
                  </div>

                  <div>
                    <p>VK</p>
                    <input
                      type="vk"
                      name="vk"
                      className="input"
                      onChange={handleChange}
                      value={values.vk}
                    />
                  </div>

                  <div>
                    <p>ФАЙЛЫ (до 4 шт)</p>
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

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    ИЗМЕНИТЬ
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

export default UpdateProfileModal;
