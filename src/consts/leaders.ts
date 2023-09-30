import {
  leadersTableGlasses,
  leadersTableKills,
  leadersTableLastActivity,
  leadersTablePlace,
  leadersTableUser,
} from './leadersAndBanlist';
import { useLang } from '../hooks/useLang';

export const header = [
  {
    id: 1,
    name: useLang(leadersTablePlace),
  },
  {
    id: 2,
    name: useLang(leadersTableUser),
  },
  {
    id: 3,
    name: useLang(leadersTableGlasses),
  },
  // {
  //   id: 3,
  //   name: 'Убийства',
  // },
  {
    id: 4,
    name: useLang(leadersTableKills),
  },
  {
    id: 5,
    name: useLang(leadersTableLastActivity),
  },
];
export const perPage = 5;
