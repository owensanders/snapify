import { UpdateProfileData } from "./UpdateProfileData";
import { UpdateProfileResponse } from "./UpdateProfileResonse";

export interface UserProfileContract {
  updateProfile(data: UpdateProfileData): Promise<UpdateProfileResponse>;
}
