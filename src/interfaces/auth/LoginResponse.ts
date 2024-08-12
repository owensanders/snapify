export interface LoginResponse {
  status: number;
  data: {
    message: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };
}
