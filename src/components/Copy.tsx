import { ReactComponent as CopyIcon } from '../assets/img/copy.svg';
import '../assets/scss/components/_scale-online.scss';
import { toast } from 'react-toastify';
import { messageCopySuccess, messageCopyError } from '../consts/modal';
import { useLang } from '../hooks/useLang';

interface CopyProps {
  className?: string;
  value: string;
}

const Copy = ({ className, value }: CopyProps) => {
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  return (
    <CopyIcon
      className={`iconCopy ${className}`}
      onClick={() => {
        copyTextToClipboard(value)
          .catch(err => toast.error(useLang(messageCopyError)))
          .then(() => toast.success(useLang(messageCopySuccess)))
          .catch(() => 'obligatory catch');
      }}
    />
  );
};

export default Copy;
