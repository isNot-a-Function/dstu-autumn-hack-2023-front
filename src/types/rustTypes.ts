export interface BanList {
  banip: number;
  nickname: string;
  reason: string;
  steamid: string;
  time: number;
}
export interface serverInfo {
  IP: string;
  currentOnline: number;
  maxPlayers: number;
  name: string;
  port: string;
  serverID: number;
}
export interface monitoringServers {
  maxServerOnline: number;
  result: serverInfo[];
  sumPlayers: number;
}
export interface getBanListItem {
  steamid: string;
  nickname: string;
  reason: string;
  time: number;
  banip: number;
}
export interface getBanListParams {
  count: number;
  page: number;
  searchValue: string;
}

interface itemData {
  amount: number;
  customFlag: boolean;
  image: string;
}

export interface productContentServiceItem {
  alert: null | string;
  itemData: itemData[];
  label: string;
  time: number;
}
interface productContentService {
  data: productContentServiceItem[];
  delay: number;
  descriptionModal: string;
  imageModal: string;
  rade: number;
  setHome: number;
}

export interface itemDataCurrency {
  id: number;
  count: number;
  procent: number;
}
export interface itemDataMoney {
  count: number;
  procent: number;
}
export interface productContentCurrency {
  data: itemDataCurrency[];
  progressBar: itemDataCurrency[];
}

interface productContentProduct {
  description: string;
}
export interface getShopItem {
  name: string;
  nameID: string;
  basePrice: number;
  id: number;
  description: string;
  image: string;
  type: string;
  amount: number;
  productContent: any | null | productContentService | productContentCurrency | productContentProduct;
  serverType: any | null;
  isChangeAmount: boolean;
  price: number;
  discount: number;
  saleDiscount: number;
  saleDeadline: Date;
  maxCountOfSale: number;
  hidden: boolean;
  number: number;
  autoactivation: boolean;
  isBackground: boolean;
  previewImage: string;
  blockSize: number;
  label: number;
  isBackgroundImage: boolean;
  buttonColor: string;
  height: number;
  iconButton: string;
  textButton: string;
}

export interface serversServer {
  id: number;
  serverTypeId: number;
  IP: string;
  port: string;
  apiKey: string;
  name: string;
  serverID: number;
}

export interface getTypeServersData {
  id: number;
  name: string;
  description: string;
  number: number;
  hidden: boolean;
}
