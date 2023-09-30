import { ModalProps } from '../../../types/modalTypes';
import Modal from '../../UI/Modal';
import '../../../assets/scss/components/shop/modals/_notification-modal.scss';
import WarningMessage from './WarningMessage';
import { Link } from 'react-router-dom';
import { userApi } from '../../../store';
import Input from '../../UI/Input';
import { useEffect, useState } from 'react';
import Copy from '../../Copy';
import Loader from '../../Loader';
import UnauthorizedModal from './UnauthorizedModal';
import { useLang } from '../../../hooks/useLang';
import {
  notificationModalBind,
  notificationModalCopyTheCode,
  notificationModalGetCode,
  notificationModalOpenServers,
  notificationModalSubTitle,
  notificationModalTitle,
  notificationModalWarningMessage,
} from '../../../consts/modal';

const NotificationModal = ({ setIsActive }: ModalProps) => {
  const [value, setValue] = useState('');
  const [isActiveModal, setIsActiveModal] = useState(false);

  const [getCodeFunc, { data: code, isLoading: codeIsLoading, isError }] = userApi.useLazyGetCodeQuery();
  const { data: contacts, isLoading } = userApi.useGetContactsForNoticesQuery();

  const getCodeHandler = () => getCodeFunc();

  useEffect(() => {
    code && setValue(code?.data);
  }, [code]);

  useEffect(() => {
    isError ? setIsActiveModal(true) : setIsActiveModal(false);
  }, [isError]);

  if (isLoading) {
    return (
      <Modal setIsActive={setIsActive} headerTitle="Будь в курсе новостей!" className="notificationModal">
        <Loader />
      </Modal>
    );
  }

  return (
    <>
      <Modal setIsActive={setIsActive} headerTitle={useLang(notificationModalTitle)} className="notificationModal">
        <>
          <div className="description">{useLang(notificationModalSubTitle)}</div>
          <p className="copyText">{useLang(notificationModalCopyTheCode)}</p>
          {codeIsLoading ? (
            <Loader mt="-25px" />
          ) : code ? (
            <div className="notificationInputWrap">
              <button className={`input notificationInput`}>{value}</button>
              <Copy className="notificationCopy" value={value} />
            </div>
          ) : (
            <button onClick={getCodeHandler} className="btn lightBtn codeBtn">
              {useLang(notificationModalGetCode)}
            </button>
          )}
          <div className="boxButtons">
            {contacts?.map((it, index) => (
              <Link to={it.url} target="_blank" key={index}>
                <button className="btn blackBtn netWorkBtn">
                  <img src={it.icon} alt="" className="iconInBtn" />
                  <p>
                    {useLang(notificationModalBind)} {it.name}
                  </p>
                </button>
              </Link>
            ))}
          </div>
          <WarningMessage text={useLang(notificationModalWarningMessage)} />
          <Link to="/servers">
            <p className="textOpenServers">{useLang(notificationModalOpenServers)}</p>
          </Link>
        </>
      </Modal>
      {isError && isActiveModal && <UnauthorizedModal setIsActive={setIsActiveModal} />}
    </>
  );
};
export default NotificationModal;
