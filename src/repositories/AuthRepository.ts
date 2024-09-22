import axios from "axios";
import { AuthRepositoryContract } from "../interfaces/auth/AuthRepositoryContract";
import { LoginData } from "../interfaces/auth/LoginData";
import { LoginResponse } from "../interfaces/auth/LoginResponse";
import { LoginValidationErrors } from "../interfaces/auth/LoginValidationErrors";
import { RegisterData } from "../interfaces/auth/RegisterData";
import { ErrorResponse } from "../interfaces/auth/RegisterValidationErrors";

export class AuthRepository implements AuthRepositoryContract {
  async login(
    data: LoginData
  ): Promise<LoginResponse | { errors: LoginValidationErrors }> {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/login",
        data
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return { errors: error.response.data.errors };
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<LoginResponse | ErrorResponse> {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/register",
        data
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return { errors: error.response.data.errors };
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const response = await axios.post("http://localhost:8000/logout");
      if (response.status !== 200) {
        throw new Error("Logout failed.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }
}
