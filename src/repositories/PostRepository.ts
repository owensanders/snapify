import axios, { AxiosError } from "axios";
import { PostType } from "../interfaces/posts/PostType";
import { PostContract } from "../interfaces/posts/PostContract";

export class PostRepository implements PostContract {
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
}
