export interface User {
  id: number;
  name: string;
  email: string;
  about: string;
}

export interface UpdateProfileResponse {
  message: string;
  user?: User;
}
