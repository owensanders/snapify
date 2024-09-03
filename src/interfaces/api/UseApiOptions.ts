export interface UseApiOptions<T = any> {
  manual?: boolean;
  initialData?: T | null;
  isAuthRequest?: boolean;
}
