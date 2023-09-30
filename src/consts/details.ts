import { useLang } from '../hooks/useLang';
import {
  detailsTableBalanceChanges,
  detailsTableDate,
  detailsTableMerchandise,
  detailsTableQuantity,
  detailsTableTypeOfOperation,
} from './profile';

export const header = [
  {
    id: 1,
    name: useLang(detailsTableDate),
  },
  {
    id: 2,
    name: 'ID',
  },
  {
    id: 3,
    name: useLang(detailsTableMerchandise),
  },
  {
    id: 4,
    name: useLang(detailsTableQuantity),
  },
  {
    id: 5,
    name: useLang(detailsTableBalanceChanges),
  },
  {
    id: 6,
    name: useLang(detailsTableTypeOfOperation),
  },
];

export const per_page = 10;
