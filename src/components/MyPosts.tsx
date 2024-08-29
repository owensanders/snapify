import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./ui/SideBar";
import Post from "./Post";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PostType } from "../interfaces/posts/PostType";

const MyPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const fetchPosts = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      const response = await axios.get<{ posts: PostType[] }>(
        `http://localhost:8000/posts/user/${user.id}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
                id={post.id}
                title={post.title}
                body={post.body}
                likes={post.likes || 0}
                comments={post.comments || 0}
                classes="mt-5"
                onDelete={fetchPosts}
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
