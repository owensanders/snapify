import Sidebar from "./ui/SideBar";
import Post from "./posts/Post";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PostType } from "../interfaces/posts/PostType";

const MyFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get<{ posts: PostType[] }>(
        `http://localhost:8000/posts`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">My Feed</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                likes={post.likes ?? []}
                comments={post.comments ?? []}
                classes="mt-10"
                onFeed={true}
                onLike={fetchPosts}
              />
            ))
          ) : (
            <p className="mt-10">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
