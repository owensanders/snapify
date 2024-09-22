import { PostType } from "./PostType";

export interface PostContract {
  getUserPosts(userId: number): Promise<PostType[]>;
}
