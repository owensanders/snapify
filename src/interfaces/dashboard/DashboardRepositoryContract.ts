import { DashboardData } from "./DashboardData";

export interface DashboardRepositoryContract {
  getDashboardData(): Promise<DashboardData>;
}
