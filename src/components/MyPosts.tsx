import React, { useState, useEffect } from "react";
import Sidebar from "./ui/SideBar";
import Post from "./ui/Post";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PostType } from "../interfaces/posts/PostType";

const MyPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<{ posts: PostType[] }>(
          `http://localhost:8000/posts/user/${user.id}`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.id]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold mb-6">My Posts</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                likes={post.likes || 0}
                comments={post.comments || 0}
                classes="mt-5"
              />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
