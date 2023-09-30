import {
  profileTableAccountReplenishment,
  profileTableFundsTransfer,
  profileTablePurchase,
  profileTableRefund,
} from '../consts/profile';
import { useLang } from '../hooks/useLang';

export const getNameOperation = (value: string, refund: boolean | undefined) => {
  let str = '';
  switch (value) {
    case 'purchase':
      str = refund === true ? useLang(profileTableRefund) : useLang(profileTablePurchase);
      break;
    case 'transaction':
      str = useLang(profileTableAccountReplenishment);
      break;
    case 'transfers':
      str = useLang(profileTableFundsTransfer);
      break;
  }
  return str;
};
