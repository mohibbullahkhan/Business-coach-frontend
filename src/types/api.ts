export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

export interface AdminData {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthData {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  admin?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export interface DashboardData {
  metrics: any;
}

