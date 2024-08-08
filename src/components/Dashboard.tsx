import Sidebar from "./SideBar";
import Card from "./ui/Card";
import Post from "./ui/Post";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-g bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex mt-6">
            <Card count={10} title="Total Posts" />
            <Card count={100} title="Total Likes" className="ml-3" />
            <Card count={16} title="Total Comments" className="ml-3" />
          </div>
          <div className="flex">
            <div className="mr-4">
              <h2 className="text-lg font-bold mt-10 mb-3 underline text-center">
                Most Recent Post
              </h2>
              <Post
                title="My Latest Post"
                body="Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minima minus maiores nisi sit. Nesciunt iusto, ut voluptatum
                  laudantium dolorum accusamus error repudiandae rem quidem
                  voluptatibus in? Eum maxime officia tenetur? Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Porro voluptate, autem
                  ad aliquid temporibus exercitationem suscipit adipisci et vel
                  excepturi perferendis error repellat architecto debitis. Vitae
                  voluptatem culpa dolorum autem."
                likes={2}
                comments={0}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold mt-10 mb-3 underline text-center">
                Most Popular Post
              </h2>
              <Post
                title="My First Post"
                body="Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minima minus maiores nisi sit. Nesciunt iusto, ut voluptatum
                  laudantium dolorum accusamus error repudiandae rem quidem
                  voluptatibus in? Eum maxime officia tenetur? Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Porro voluptate, autem
                  ad aliquid temporibus exercitationem suscipit adipisci et vel
                  excepturi perferendis error repellat architecto debitis. Vitae
                  voluptatem culpa dolorum autem."
                likes={15}
                comments={6}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
