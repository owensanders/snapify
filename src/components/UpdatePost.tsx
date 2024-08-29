import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { PostType } from "../interfaces/posts/PostType";
import axios from "axios";
import Sidebar from "./ui/SideBar";

const UpdatePost = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<{ post: PostType }>(
          `http://localhost:8000/posts/${id}`
        );

        if (response.status === 200) {
          setPost(response.data.post);
        }
      } catch (error) {
        console.log("There was an error fetching your post.", error);
      }
    };

    fetchPost();
  }, [id]);

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
          <p>Loading post...</p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
