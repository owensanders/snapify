import Sidebar from "./ui/SideBar";
import Post from "./ui/Post";

const MyPosts = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold mb-6">My Posts</h1>
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
            likes={2}
            comments={0}
          />
          <Post
            title="My Second Post"
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
            classes="mt-5"
          />
          <Post
            title="My Third Post"
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
            classes="mt-5"
          />
          <Post
            title="My Fourth Post"
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
            classes="mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
