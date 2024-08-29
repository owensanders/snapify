import { UseApiRequestParams } from "./UseApiRequestParams";

export interface UseApiRequestReturn<R> {
  loading: boolean;
  error: string | null;
  data: R | null;
  execute: (
    overrideParams?: Partial<UseApiRequestParams<any, R>>
  ) => Promise<void>;
}
