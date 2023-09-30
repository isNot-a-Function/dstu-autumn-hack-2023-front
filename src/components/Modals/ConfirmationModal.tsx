import '../../assets/scss/components/modals/_confirmation.scss';
import Modal from '../UI/Modal';
import { useLang } from '../../hooks/useLang';
import { confirmationModalNo, confirmationModalYes } from '../../consts/profile';

interface ConfirmationModalProps {
  func: () => void;
  modalTitle: string;
  setIsActive: (param: boolean) => void;
}

const ConfirmationModal = ({ modalTitle, func, setIsActive }: ConfirmationModalProps) => {
  const confirmHandler = () => {
    func();
    setIsActive(false);
  };
  const unconfirmHandler = () => {
    setIsActive(false);
  };

  return (
    <Modal headerTitle={modalTitle} setIsActive={setIsActive} className="confirmation">
      <div className="content">
        <button onClick={unconfirmHandler} className="btn lightBtn confirmationBtn mb">
          {useLang(confirmationModalNo)}
        </button>
        <button onClick={confirmHandler} className="btn blackBtn confirmationBtn">
          {useLang(confirmationModalYes)}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
