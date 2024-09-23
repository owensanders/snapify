import { UpdateProfileData } from "../interfaces/my-profile/UpdateProfileData";
import { UpdateProfileResponse } from "../interfaces/my-profile/UpdateProfileResonse";
import { UserProfileContract } from "../interfaces/my-profile/UserRepositoryContract";

export class UpdateProfileUseCase {
  constructor(private userRepository: UserProfileContract) {}

  async execute(data: UpdateProfileData): Promise<UpdateProfileResponse> {
    return await this.userRepository.updateProfile(data);
  }
}
