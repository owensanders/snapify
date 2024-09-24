import { CreatePostData } from "./CreatePostData";
import { CreatePostResponse } from "./CreatePostResponse";
import { PostType } from "./PostType";

export interface PostRepositoryContract {
  getUserPosts(userId: number): Promise<PostType[]>;
  deletePost(postId: number): Promise<void>;
  likePost(postId: number): Promise<void>;
  commentPost(postId: number, comment: string): Promise<void>;
  createPost(data: CreatePostData): Promise<CreatePostResponse>;
  updatePost(data: CreatePostData): Promise<CreatePostResponse>;
  getPostById(id: string): Promise<PostType>;
}
