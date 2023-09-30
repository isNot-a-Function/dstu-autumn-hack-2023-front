import React from 'react';
import '../../../assets/scss/components/shop/modals/_unauthorized-modal.scss';
import Modal from '../../UI/Modal';
import { ModalProps } from '../../../types/modalTypes';
import { handleSteamLogin } from '../../../utils/handleSteamLogin';

const UnauthorizedModal = ({ setIsActive }: ModalProps) => {
  return (
    <Modal headerTitle="Вы не авторизованы" setIsActive={setIsActive} className="unauthorizedModal">
      <button onClick={handleSteamLogin} className="btn lightBtn wideBtn">
        Авторизоваться
      </button>
    </Modal>
  );
};

export default UnauthorizedModal;
