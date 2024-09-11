import { useEffect } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { PostType } from "../../interfaces/posts/PostType";
import Sidebar from "../ui/SideBar";
import { useApi } from "../../hooks/useApi";

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data,
    error,
    fetchData: fetchPost,
    loading,
  } = useApi<{ post: PostType }>(
    {
      url: `http://localhost:8000/posts/${id}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [fetchPost, id]);

  return data?.post ? (
    <PostForm
      post={data.post}
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
              There was an error fetching your post: {error.message}
            </p>
          )}
          {!loading && !data?.post && <p>Post not found.</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
