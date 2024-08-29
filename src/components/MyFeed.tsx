import Sidebar from "./ui/SideBar";
import Post from "./posts/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostType } from "../interfaces/posts/PostType";

const MyFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const response = await axios.get<{ posts: PostType[] }>(
          `http://localhost:8000/posts`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">My Feed</h1>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              likes={post.likes ?? 0}
              comments={post.comments ?? 0}
              classes="mt-10"
              onFeed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
