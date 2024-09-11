import { useEffect } from "react";
import Sidebar from "../ui/SideBar";
import Post from "./Post";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PostType } from "../../interfaces/posts/PostType";
import { useApi } from "../../hooks/useApi";

const MyPosts = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    data,
    error,
    fetchData: fetchPosts,
    loading,
  } = useApi<{ posts: PostType[] }>(
    {
      url: `http://localhost:8000/posts/user/${user?.id}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    if (user?.id) {
      fetchPosts();
    }
  }, [fetchPosts, user?.id]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold mb-6">My Posts</h1>
          {loading && <p>Loading posts...</p>}
          {error && (
            <p className="text-red-600">
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
                  likes={post.likes || []}
                  comments={post.comments || []}
                  classes="mt-5"
                  onDelete={fetchPosts}
                />
              ))
            : !loading && <p>No posts available.</p>}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
