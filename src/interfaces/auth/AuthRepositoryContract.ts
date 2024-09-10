import { LoginData } from "./LoginData";
import { LoginResponse } from "./LoginResponse";
import { LoginValidationErrors } from "./LoginValidationErrors";
import { RegisterData } from "./RegisterData";
import { ErrorResponse } from "./RegisterValidationErrors";

export interface AuthRepositoryContract {
  login(
    data: LoginData
  ): Promise<LoginResponse | { errors: LoginValidationErrors }>;

  register(data: RegisterData): Promise<LoginResponse | ErrorResponse>;
}
