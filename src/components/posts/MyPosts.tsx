import { useEffect, useState } from "react";
import Sidebar from "../ui/SideBar";
import Post from "./Post";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PostType } from "../../interfaces/posts/PostType";
import { PostRepository } from "../../repositories/PostRepository";
import { useCallback } from "react";
import { GetUserPostsUseCase } from "../../use-cases/GetUserPostsUseCase";

const MyPosts = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPosts = useCallback(async () => {
    if (!user?.id) return;

    const getUserPostsUseCase = new GetUserPostsUseCase(new PostRepository());

    try {
      setLoading(true);
      const userPosts = await getUserPostsUseCase.execute(user.id);
      setPosts(userPosts);
    } catch (err: any) {
      setError(err.message || "Error fetching posts.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold mb-6">My Posts</h1>
          {loading && <p>Loading posts...</p>}
          {error && (
            <p className="text-red-600">Error fetching posts: {error}</p>
          )}
          {posts.length
            ? posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  likes={post.likes || []}
                  comments={post.comments || []}
                  classes="mt-5"
                  onDelete={fetchUserPosts}
                />
              ))
            : !loading && <p>No posts available.</p>}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
