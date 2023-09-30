import '../../../assets/scss/components/shop/modals/_unauthorized-modal.scss';
import Modal from '../../UI/Modal';

interface LackOfFundsModalProps {
  setIsActive: (param: boolean) => void;
  setIsActiveTopUpModal: (param: boolean) => void;
}

const LackOfFundsModal = ({ setIsActive, setIsActiveTopUpModal }: LackOfFundsModalProps) => {
  const onClickHandler = () => {
    setIsActive(false);
    setIsActiveTopUpModal(true);
  };

  return (
    <Modal headerTitle="У вас недостаточно средств" setIsActive={setIsActive} className="unauthorizedModal">
      <button onClick={onClickHandler} className="btn lightBtn wideBtn">
        Пополнить счёт
      </button>
    </Modal>
  );
};

export default LackOfFundsModal;
