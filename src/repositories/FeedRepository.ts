import axios from "axios";
import { FeedRepositoryContract } from "../interfaces/my-feed/FeedRepositoryContract";
import { PostType } from "../interfaces/posts/PostType";

export class FeedRepository implements FeedRepositoryContract {
  async fetchPosts(): Promise<{ posts: PostType[] }> {
    const response = await axios.get<{ posts: PostType[] }>(
      "http://localhost:8000/posts"
    );
    return response.data;
  }
}
