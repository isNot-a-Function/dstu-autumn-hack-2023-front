export interface specialization {
  id: string;
  title: string;
  topLevelTitle: string;
}

export interface getSpecializationsData {
  message: string;
  specializations: specialization[];
}

export interface getOrdersData {
  cost: number;
  costType: string;
  createdAt: string;
  customer: { id: string; userId: string; rating: number };
  customerId: string;
  description: string;
  files: string[];
  id: string;
  responsesCount: number;
  specialization: { id: string; title: string; topLevelTitle: string };
  specializationId: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: string;
  views: number;
}
