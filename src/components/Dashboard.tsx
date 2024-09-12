import Sidebar from "./ui/SideBar";
import Card from "./ui/Card";
import Post from "./posts/Post";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState, useMemo, useCallback } from "react";
import { DashboardData } from "../interfaces/dashboard/DashboardData";
import { DashboardRepository } from "../repositories/DashboardRepository";
import { GetDashboardDataUseCase } from "../useCases/GetDashboardDataUseCase";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDashboardDataUseCase = useMemo(() => {
    return new GetDashboardDataUseCase(new DashboardRepository());
  }, []);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardDataUseCase.execute();
      setDashboardData(data);
    } catch (err) {
      setError("Error loading dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [getDashboardDataUseCase]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h1 className="text-xl font-bold mt-3">Welcome, {user.name}!</h1>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {dashboardData && (
            <>
              <div className="flex mt-6">
                <Card count={dashboardData?.total_posts} title="Total Posts" />
                <Card
                  count={dashboardData?.total_likes}
                  title="Total Likes"
                  className="ml-3"
                />
                <Card
                  count={dashboardData?.total_comments}
                  title="Total Comments"
                  className="ml-3"
                />
              </div>
              <div className="flex">
                {dashboardData?.most_recent_post && (
                  <div className="mr-4 flex-grow">
                    <h2 className="text-lg font-bold mt-10 mb-3 underline text-center">
                      Most Recent Post
                    </h2>
                    <Post
                      id={dashboardData?.most_recent_post?.id}
                      title={dashboardData?.most_recent_post?.title}
                      body={dashboardData?.most_recent_post?.body}
                      likes={dashboardData?.most_recent_post?.likes}
                      comments={dashboardData?.most_recent_post?.comments}
                      onDelete={fetchDashboardData}
                    />
                  </div>
                )}
                {dashboardData?.post_with_most_likes && (
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold mt-10 mb-3 underline text-center">
                      Most Popular Post
                    </h2>
                    <Post
                      id={dashboardData.post_with_most_likes?.id}
                      title={dashboardData?.post_with_most_likes?.title}
                      body={dashboardData?.post_with_most_likes?.body}
                      likes={dashboardData?.post_with_most_likes?.likes}
                      comments={dashboardData?.post_with_most_likes?.comments}
                      onDelete={fetchDashboardData}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
