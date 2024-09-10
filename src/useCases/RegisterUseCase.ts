import { AuthRepositoryContract } from "../interfaces/auth/AuthRepositoryContract";
import { LoginResponse } from "../interfaces/auth/LoginResponse";
import { RegisterData } from "../interfaces/auth/RegisterData";
import { ErrorResponse } from "../interfaces/auth/RegisterValidationErrors";

export class RegisterUseCase {
  constructor(private authRepository: AuthRepositoryContract) {}

  async execute(data: RegisterData): Promise<LoginResponse | ErrorResponse> {
    return this.authRepository.register(data);
  }
}
