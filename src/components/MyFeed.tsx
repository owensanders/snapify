import Sidebar from "./ui/SideBar";
import Post from "./posts/Post";
import { useEffect, useState, useMemo, useCallback } from "react";
import { PostType } from "../interfaces/posts/PostType";
import { GetMyFeedPostsUseCase } from "../use-cases/GetMyFeedPostsUseCase";
import { FeedRepository } from "../repositories/FeedRepository";

const MyFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyFeedPostsUseCase = useMemo(() => {
    return new GetMyFeedPostsUseCase(new FeedRepository());
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyFeedPostsUseCase.execute();
      const posts = Object.values(data.posts);
      setPosts(posts);
    } catch (err) {
      setError("Error fetching posts.");
    } finally {
      setLoading(false);
    }
  }, [getMyFeedPostsUseCase]);

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
          {error && <p className="mt-10 text-red-600">{error}</p>}
          {posts.length
            ? posts.map((post) => (
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
