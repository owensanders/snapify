import Sidebar from "./ui/SideBar";
import Post from "./posts/Post";
import { useEffect } from "react";
import { PostType } from "../interfaces/posts/PostType";
import { useApi } from "../hooks/useApi";

const MyFeed = () => {
  const {
    data,
    error,
    fetchData: fetchPosts,
    loading,
  } = useApi<{ posts: PostType[] }>(
    {
      url: "http://localhost:8000/posts",
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">My Feed</h1>
          {loading && <p className="mt-10">Loading posts...</p>}
          {error && (
            <p className="mt-10 text-red-600">
              Error fetching posts: {error.message}
            </p>
          )}
          {data?.posts?.length
            ? data.posts.map((post) => (
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
            : !loading && <p className="mt-10">No posts available.</p>}
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
