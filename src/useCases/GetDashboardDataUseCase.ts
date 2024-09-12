import { DashboardRepositoryContract } from "../interfaces/dashboard/DashboardRepositoryContract";
import { DashboardData } from "../interfaces/dashboard/DashboardData";

export class GetDashboardDataUseCase {
  constructor(private dashboardRepository: DashboardRepositoryContract) {}

  async execute(): Promise<DashboardData> {
    return await this.dashboardRepository.getDashboardData();
  }
}
