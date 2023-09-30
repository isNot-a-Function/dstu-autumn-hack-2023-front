import { useLang } from '../hooks/useLang';
import { profileTableMode, profileTableProduct, profileTableQuantity } from './profile';

export const header = [
  {
    id: 1,
    name: 'ID',
  },
  {
    id: 2,
    name: useLang(profileTableProduct),
  },
  {
    id: 3,
    name: useLang(profileTableQuantity),
  },
  {
    id: 4,
    name: useLang(profileTableMode),
  },
  // {
  //   id: 5,
  //   name: 'Дата покупки',
  // },
  {
    id: 6,
    name: '',
  },
  {
    id: 7,
    name: '',
  },
];

export const per_page = 10;
