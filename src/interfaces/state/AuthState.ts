export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    about: string | undefined;
  };
}
