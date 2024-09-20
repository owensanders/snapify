import axios, { AxiosError } from "axios";
import { UpdateProfileData } from "../interfaces/my-profile/UpdateProfileData";
import { UpdateProfileResponse } from "../interfaces/my-profile/UpdateProfileResonse";
import { UseApiErrorResponse } from "../interfaces/api/UseApiErrorResponse";
import { UserProfileContract } from "../interfaces/my-profile/UserProfileContract";

export class UserRepository implements UserProfileContract {
  async updateProfile(data: UpdateProfileData): Promise<UpdateProfileResponse> {
    try {
      const response = await axios.post<UpdateProfileResponse>(
        "http://localhost:8000/my-profile/update",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError<UseApiErrorResponse>;
        if (apiError.response) {
          throw apiError.response.data;
        }
      }
      throw new Error("Unexpected error occurred");
    }
  }
}
