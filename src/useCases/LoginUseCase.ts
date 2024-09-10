import { AuthRepositoryContract } from "../interfaces/auth/AuthRepositoryContract";
import { LoginData } from "../interfaces/auth/LoginData";
import { LoginResponse } from "../interfaces/auth/LoginResponse";
import { LoginValidationErrors } from "../interfaces/auth/LoginValidationErrors";

export class LoginUseCase {
  constructor(private authRepository: AuthRepositoryContract) {}

  async execute(
    data: LoginData
  ): Promise<LoginResponse | { errors: LoginValidationErrors }> {
    return this.authRepository.login(data);
  }
}
