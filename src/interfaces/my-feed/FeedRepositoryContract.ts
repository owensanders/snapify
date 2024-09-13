import { PostType } from "../posts/PostType";

export interface FeedRepositoryContract {
  fetchPosts(): Promise<{ posts: PostType[] }>;
}
