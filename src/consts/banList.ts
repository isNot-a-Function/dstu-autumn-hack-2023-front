import { useLang } from '../hooks/useLang';
import { banListTableDate, banListTableIPBan, banListTablePlayer, banListTableReason } from './leadersAndBanlist';

export const header = [
  {
    id: 1,
    name: useLang(banListTableDate),
  },
  {
    id: 2,
    name: useLang(banListTablePlayer),
  },
  {
    id: 3,
    name: useLang(banListTableReason),
  },
  {
    id: 4,
    name: useLang(banListTableIPBan),
  },
];
