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

const ChangeParametrsModal = ({
  isActive,
  setIsActive,
  isUpdate = false,
  info = null,
  orderId,
}: MonitoringModalProps) => {
  const [createCase, {}] = flightApi.useCreateOrderMutation();
  const [updateCase, {}] = flightApi.useUpdateOrderMutation();
  const [checkFile, { data: link, isSuccess }] =
    flightApi.useCheckFileMutation();
  const [linkFiles, setLinkFiles] = useState<any>(
    info === null ? [] : info.files
  );

  const select_wagon_type = [
    {
      value: "coupe",
      label: "Купе",
    },
    {
      value: "lux",
      label: "Люкс",
    },
    {
      value: "reserved",
      label: "Плацкарт",
    },
    {
      value: "sitting",
      label: "Сидячий",
    },
    {
      value: "sv",
      label: "СВ",
    },
  ];

  const select_family_status = [
    {
      value: "married",
      label: "Женат/замужем",
    },
    {
      value: "relationship",
      label: "В отношениях",
    },
    {
      value: "single",
      label: "Свободный",
    },
  ];

  const select_hobbies = [
    {
      value: "dance",
      label: "танцы",
    },
    {
      value: "single",
      label: "вокал",
    },
    {
      value: "paint",
      label: "рисование",
    },
  ];

  const select_place_position = [
    {
      value: "up",
      label: "Вверхняя полка",
    },
    {
      value: "down",
      label: "Нижняя полка",
    },
  ];

  const select_psy = [
    {
      value: "extrovert",
      label: "Экстроверт",
    },
    {
      value: "introvert",
      label: "Интроверт",
    },
    {
      value: "average",
      label: "Cредний",
    },
  ];

  const select_relig = [
    {
      value: "christianity",
      label: "Христианин",
    },
    {
      value: "islam",
      label: "Ислам",
    },
    {
      value: "judaism",
      label: "Иудаизм",
    },
    {
      value: "buddhism",
      label: "Буддизм",
    },
    {
      value: "judaism",
      label: "Иудаизм",
    },
    {
      value: "hinduism",
      label: "Индуизм",
    },
    {
      value: "sikhism",
      label: "Сикхизм",
    },
    {
      value: "hinduism",
      label: "Индуизм",
    },
    {
      value: "confucianism",
      label: "Конфуцианство",
    },
    {
      value: "taoism",
      label: "Даосизм",
    },
    {
      value: "shintoism",
      label: "Синтоизм",
    },
  ];

  const select_sex = [
    {
      value: "male",
      label: "Мужской",
    },
    {
      value: "female",
      label: "Женский",
    },
  ];

  const [selectWagonType, setSelectWagonType] = useState(select_wagon_type[0]);
  const [selectFamilyStatus, setSelectFamilyStatus] = useState(
    select_family_status[0]
  );
  const [placePosition, setPlacePosition] = useState(select_place_position[0]);
  const [selectPsy, setSelectPsy] = useState(select_psy[0]);
  const [selectRelig, setSelectRelig] = useState(select_relig[0]);
  const [selectSex, setSelectSex] = useState(select_sex[0]);

  // const handleFileChange = async (e: any) => {
  //   const formData = new FormData();
  //   formData.append("files", e.target.files[0]);
  //   checkFile(formData).then((data: any) => {
  //     if (data?.data.files !== undefined) {
  //       setFileList([...fileList, ...e.target.files]);
  //       setLinkFiles([...linkFiles, ...data?.data.files]);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (costType.value === "contract") {
  //     setCost(null);
  //   }
  // }, [costType]);

  // if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Изменение предпочтений"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{
              name: info === null ? "" : info.title,
              tags: info === null ? "" : info.tags.join(","),
              age: "",
              allergyToAnimals: false,
              dislikeForChildren: false,
              hobbies: "",
              lang: "",
              snore: false,
            }}
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
              console.log("values", values.allergyToAnimals);
              // !isUpdate
              //   ? createCase({
              //       title: values.name,
              //       description: description,
              //       files: linkFiles,
              //       tags: values.tags.split(",").map((it: any) => it.trim()),
              //       costType: costType.value,
              //       cost: Number(cost),
              //       specialization: specializations.value,
              //     })
              //   : updateCase({
              //       title: values.name,
              //       description: description,
              //       files: linkFiles,
              //       tags: values.tags.split(",").map((it: any) => it.trim()),
              //       costType: costType.value,
              //       cost: Number(cost),
              //       specialization: specializations.value,
              //       orderId: orderId,
              //     });
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
                    <p>ВОЗРАСТ</p>
                    <input
                      type="string"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>

                  <div>
                    <p>ПРЕДПОЧТИТЕЛЬНЫЙ ТИП ВАГОНА</p>
                    <CustomSelect
                      value={selectWagonType}
                      options={select_wagon_type}
                      onChange={setSelectWagonType}
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
                    <p>СЕМЕЙНОЕ ПОЛОЖЕНИЕ</p>
                    <CustomSelect
                      value={selectFamilyStatus}
                      options={select_family_status}
                      onChange={setSelectWagonType}
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
                    <p>ХОББИ(введите через запятую)</p>
                    <input
                      type="string"
                      name="tags"
                      className="input"
                      onChange={handleChange}
                      value={values.hobbies}
                    />
                  </div>

                  <div>
                    <p>ЯЗЫКИ, КОТОРЫЕ ВЫ ЗНАЕТЕ(введите через запятую)</p>
                    <input
                      type="string"
                      name="tags"
                      className="input"
                      onChange={handleChange}
                      value={values.lang}
                    />
                  </div>

                  <div>
                    <p>ПРЕДПОЧТЕНИЯ ПО РАСПОЛОЖЕНИЮ МЕСТА</p>
                    <CustomSelect
                      value={placePosition}
                      options={select_place_position}
                      onChange={setPlacePosition}
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
                    <p>ПCИХОТИП</p>
                    <CustomSelect
                      value={selectPsy}
                      options={select_psy}
                      onChange={setSelectPsy}
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
                    <p>РЕЛИГИЯ</p>
                    <CustomSelect
                      value={selectRelig}
                      options={select_relig}
                      onChange={setSelectRelig}
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
                    <p>ПОЛ</p>
                    <CustomSelect
                      value={selectSex}
                      options={select_sex}
                      onChange={setSelectSex}
                      isHaveIcon={false}
                      width={"100%"}
                      heightSelect={45}
                      paddingIndicator={0}
                      paddingContainer={12}
                      backgroundColor={"#171226"}
                      menuPlacement={"bottom"}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ width: "80%" }}>Я ХРАПЛЮ</p>
                    <input
                      type="checkbox"
                      name="snore"
                      className="input"
                      onChange={handleChange}
                      checked={values.snore}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ width: "80%" }}>
                      {" "}
                      У МЕНЯ ЕСТЬ АЛЛЕРГИЯ НА ЖИВОТНЫХ
                    </p>
                    <input
                      type="checkbox"
                      name="allergyToAnimals"
                      className="input"
                      onChange={handleChange}
                      checked={values.allergyToAnimals}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ width: "80%" }}>Я НЕ ЛЮБЛЮ ДЕТЕЙ</p>
                    <input
                      type="checkbox"
                      name="dislikeForChildren"
                      className="input"
                      onChange={handleChange}
                      checked={values.dislikeForChildren}
                    />
                  </div>

                  {/* <div>
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
                        onChange={(v: any) => setCost(v.target.value)}
                        style={{ width: "50%" }}
                        disabled={costType.value === "contract"}
                        value={cost === null ? "" : cost}
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
                  </div> */}

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    {isUpdate ? "ИЗМЕНИТЬ ЗАКАЗ" : "CОЗДАТЬ ЗАКАЗ"}
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

export default ChangeParametrsModal;
