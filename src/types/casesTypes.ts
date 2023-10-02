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
export interface getOrderData {
  order: {
    id: string;
    createdAt: string;
    updatedAt: string;
    customerId: string;
    status: string;
    title: string;
    description: string;
    files: any;
    tags: string[];
    views: number;
    costType: string;
    cost: number;
    responsesCount: number;
    specializationId: string;
    customer: {
      id: string;
      userId: string;
      rating: number;
    };
    specialization: {
      id: string;
      title: string;
      topLevelTitle: string;
    };
  };
  user: {
    id: string;
    email: string;
    passwordHash: string;
    role: string;
    name: string;
    family: string;
    dateOfBirth: string;
    city: string;
    logo: string;
    contact: string;
    custoremInfo: {
      id: string;
      userId: string;
      rating: 4.7;
    };
  };
}

export interface createResponseProps {
  orderId: string;
  comment: string;
}
export interface archiveOrder {
  orderId: string;
}
