export interface specialization {
  id: string;
  title: string;
  topLevelTitle: string;
}

export interface getSpecializationsData {
  message: string;
  specializations: specialization[];
}
