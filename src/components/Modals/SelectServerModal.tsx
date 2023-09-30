import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { useBodyScrollModal } from '../../hooks/useBodyScrollModal';
import { rustApi, userApi } from '../../store';
import Loader from '../Loader';

interface SelectServerModalProps {
  setIsActive: (value: boolean) => void;
  id?: number;
  onLeadersPage?: boolean;
  activeServer: number | null;
  setActiveServer: (param: number | null) => void;
}

const SelectServerModal = ({
  setIsActive,
  onLeadersPage,
  id,
  activeServer,
  setActiveServer,
}: SelectServerModalProps) => {
  const { data, isLoading } = rustApi.useGetServersByModeQuery();
  const [localActiveServer, setLocalActiveServer] = useState<number | null>(activeServer);
  const [activateService] = userApi.useActivateServiceMutation();

  useBodyScrollModal();

  const onClickHandler = async () => {
    if (id && localActiveServer && localActiveServer) {
      await activateService({ id, serverId: localActiveServer });
    } else {
      setActiveServer(localActiveServer);
    }
    setIsActive(false);
  };

  return (
    <Modal
      setIsActive={setIsActive}
      headerTitle="Выберите сервер"
      className="selectServerModal"
      onLeadersPage={onLeadersPage}
    >
      <>
        <div className="selectServer">
          {isLoading && <Loader />}
          {!data || (data.length === 0 && <h1 className="noRecords">Нет записей</h1>)}
          {data?.map((el, index) => (
            <label
              onClick={() => setLocalActiveServer(el.id)}
              htmlFor={`radio${index}`}
              className="radio-label"
              key={el.name}
            >
              {el.name}
              <input
                className="radio-input"
                type="radio"
                name="server"
                id={`radio${index}`}
                onChange={e => setActiveServer(+e.target.value)}
                checked={index + 1 === localActiveServer}
              />
              <span className="custom-radio" />
            </label>
          ))}
        </div>
        <button
          onClick={onClickHandler}
          disabled={!localActiveServer}
          className={`btn wideBtn ${localActiveServer ? 'lightBtn' : 'blackBtn'}`}
        >
          Подтвердить
        </button>
      </>
    </Modal>
  );
};

export default SelectServerModal;
