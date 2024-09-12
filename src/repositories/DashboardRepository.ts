import axios from "axios";
import { DashboardData } from "../interfaces/dashboard/DashboardData";
import { DashboardRepositoryContract } from "../interfaces/dashboard/DashboardRepositoryContract";

export class DashboardRepository implements DashboardRepositoryContract {
  async getDashboardData(): Promise<DashboardData> {
    const response = await axios.get<DashboardData>(
      "http://localhost:8000/dashboard"
    );
    return response.data;
  }
}
