
export interface Restaurant {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string;
  description: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdate: string;
}

export type ApplicationStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';

export interface ApplicationStep {
  name: string;
  completed: boolean;
  date?: string;
  description?: string;
}

export interface Application {
  id: string;
  restaurantId: string;
  restaurantName: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdate: string;
  steps: ApplicationStep[];
  notes?: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  commission: string;
  features: string[];
  popular?: boolean;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
}
