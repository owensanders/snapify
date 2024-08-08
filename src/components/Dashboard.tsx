import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./SideBar";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-g bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-lg font-bold mt-10 mb-3 underline">
            Most Recent Post
          </h2>
          <div className="flex">
            <div className="border w-2/3 rounded-md p-4 shadow-md">
              <h1 className="text-lg font-bold">My Latest Post</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
                minus maiores nisi sit. Nesciunt iusto, ut voluptatum laudantium
                dolorum accusamus error repudiandae rem quidem voluptatibus in?
                Eum maxime officia tenetur? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Porro voluptate, autem ad aliquid
                temporibus exercitationem suscipit adipisci et vel excepturi
                perferendis error repellat architecto debitis. Vitae voluptatem
                culpa dolorum autem.
              </p>
              <div className="mt-3 flex">
                <p className="mr-4">
                  2 <FontAwesomeIcon icon={faThumbsUp} /> Likes
                </p>
                <p>
                  0 <FontAwesomeIcon icon={faComment} /> Commments
                </p>
              </div>
            </div>
            <div className="border w-1/3 rounded-md p-4 ml-2 shadow-md">
              <h1 className="text-lg font-bold text-center underline mb-7">
                Analytics
              </h1>
              <p className="text-center my-3">
                <span className="font-bold">Total Likes:</span> 150
              </p>
              <p className="text-center">
                <span className="font-bold">Total Comments:</span> 50
              </p>
              <p className="text-center mt-3">
                <span className="font-bold">Total Posts:</span> 25
              </p>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-10 mb-3 underline">
            Most Popular Post
          </h2>
          <div className="border w-auto rounded-md p-4 shadow-md">
            <h1 className="text-lg font-bold">My First Post</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
              minus maiores nisi sit. Nesciunt iusto, ut voluptatum laudantium
              dolorum accusamus error repudiandae rem quidem voluptatibus in?
              Eum maxime officia tenetur? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Porro voluptate, autem ad aliquid temporibus
              exercitationem suscipit adipisci et vel excepturi perferendis
              error repellat architecto debitis. Vitae voluptatem culpa dolorum
              autem.
            </p>
            <div className="mt-3 flex">
              <p className="mr-4">
                5 <FontAwesomeIcon icon={faThumbsUp} /> Likes
              </p>
              <p>
                10 <FontAwesomeIcon icon={faComment} /> Commments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
