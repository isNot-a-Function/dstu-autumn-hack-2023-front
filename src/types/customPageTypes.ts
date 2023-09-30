export interface getCustomPagesData {
  id: number;
  icon: string;
  typeUrl: string;
  url: string;
  isHaveSidebar: boolean;
}

export interface getCustomPageData {
  id: number;
  icon: string;
  text: string;
  typeUrl: string;
  url: string;
  hidden: boolean;
  sections: customPageItem[];
  isHaveSidebar: boolean;
}

export interface customPageItem {
  id: number;
  html: string;
  icon: string;
  title: string;
}

export interface getSettingsDataItem {
  id: number;
  url: string;
  icon: string;
  name: string;
}
export interface getSettingsData {
  saleMode: false;
  panelURLs: {
    top: {
      contacts: getSettingsDataItem[];
      sections: getSettingsDataItem[];
      isShowContacts: boolean;
    };
    footer: {
      contacts: getSettingsDataItem[];
      // urlRules: string;
      conditionsOfUse: string;
      termOfUse: string;
      privacyPolicy: string;
    };
  };
  mainPage: string;
  header: string;
}
