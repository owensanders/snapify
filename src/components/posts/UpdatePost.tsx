import { useEffect, useMemo, useState } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { PostType } from "../../interfaces/posts/PostType";
import Sidebar from "../ui/SideBar";
import { PostRepository } from "../../repositories/PostRepository";
import { FetchPostUseCase } from "../../use-cases/FetchPostUseCase";

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostUseCase = useMemo(
    () => new FetchPostUseCase(new PostRepository()),
    []
  );

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const fetchedPost = await fetchPostUseCase.execute(id);
          setPost(fetchedPost);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, fetchPostUseCase]);

  return post ? (
    <PostForm
      post={post}
      isCreate={false}
      message="Post updated successfully!"
    />
  ) : (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold mb-6">Update Post</h1>
          {loading && <p>Loading post...</p>}
          {error && (
            <p className="text-red-600">
              There was an error fetching your post: {error}
            </p>
          )}
          {!loading && !post && <p>Post not found.</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
