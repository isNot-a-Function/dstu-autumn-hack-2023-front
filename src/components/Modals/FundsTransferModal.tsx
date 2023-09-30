import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { ModalProps } from '../../types/modalTypes';
import { ReactComponent as Warning } from '../../assets/img/warning.svg';
import Input from '../UI/Input';

const FundsTransferModal = ({ isActive, setIsActive }: ModalProps) => {
  const [userInput, setUserInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  return (
    <Modal isActive={isActive} setIsActive={setIsActive} headerTitle="Перевод средств" className="fundsTransferModal">
      <div className="fundsTransferModalInner">
        <div>
          <div className="canBeTranslated">
            <div className="canBeTranslatedInner">
              <span>Может быть переведено</span>
              <Warning />
            </div>
            <h3>32401 ₽</h3>
          </div>
          <div className="canBeTranslatedInputContainer">
            <div className="canBeTranslatedInputItem">
              <h4>Пользователь</h4>
              <Input value={userInput} setValue={setUserInput} placeholder="Введите SteamID64" />
            </div>
            <div className="canBeTranslatedInputItem">
              <h4>Введите сумму</h4>
              <Input isNumber value={amountInput} setValue={setAmountInput} placeholder="Сумма" />
            </div>
            <h4>Минимальная сумма для перевода 50 ₽</h4>
          </div>
        </div>
        <div>
          <div className="fundsTransferModalWarning">Транзакция выполняется от 15 минут до 24 часов</div>
          {userInput && amountInput ? (
            <button onClick={() => console.log(userInput, amountInput)} className="btn lightBtn wideBtn">
              Подтвердить
            </button>
          ) : (
            <button disabled className="btn blackBtn wideBtn">
              Подтвердить
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FundsTransferModal;
