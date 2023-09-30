import { ReactComponent as Warning } from '../../../assets/img/warning.svg';
interface WarningMessageProps {
  text: string;
}

const WarningMessage = ({ text }: WarningMessageProps) => {
  return (
    <div className="serviceModalRightContentWarning">
      <Warning className="warningIcon" />
      <span className="serviceModalRightContentWarningTitle">{text}</span>
    </div>
  );
};
export default WarningMessage;
