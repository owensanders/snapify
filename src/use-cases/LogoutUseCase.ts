import { AuthRepositoryContract } from "../interfaces/auth/AuthRepositoryContract";

export class LogoutUseCase {
  constructor(private authRepository: AuthRepositoryContract) {}

  async execute() {
    return this.authRepository.logout();
  }
}
