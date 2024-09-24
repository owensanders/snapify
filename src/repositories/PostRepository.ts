import axios, { AxiosError } from "axios";
import { PostType } from "../interfaces/posts/PostType";
import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";
import { CreatePostData } from "../interfaces/posts/CreatePostData";
import { CreatePostResponse } from "../interfaces/posts/CreatePostResponse";

export class PostRepository implements PostRepositoryContract {
  async getUserPosts(userId: number): Promise<PostType[]> {
    try {
      const response = await axios.get<{ posts: PostType[] }>(
        `http://localhost:8000/posts/user/${userId}`
      );
      return response.data.posts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError;
        throw apiError.response?.data || new Error("An error occurred");
      }
      throw new Error("Unexpected error occurred");
    }
  }

  async deletePost(postId: number): Promise<void> {
    await axios.delete(`http://localhost:8000/posts/${postId}`);
  }

  async likePost(postId: number): Promise<void> {
    await axios.post(`http://localhost:8000/posts/${postId}/like`);
  }

  async commentPost(postId: number, comment: string): Promise<void> {
    await axios.post("http://localhost:8000/posts/comment", {
      id: postId,
      comment,
    });
  }

  async createPost(data: CreatePostData): Promise<CreatePostResponse> {
    const response = await axios.post<CreatePostResponse>(
      "http://localhost:8000/posts/create",
      data
    );
    return response.data;
  }

  async updatePost(data: CreatePostData): Promise<CreatePostResponse> {
    const response = await axios.put<CreatePostResponse>(
      "http://localhost:8000/posts/update",
      data
    );
    return response.data;
  }
}
