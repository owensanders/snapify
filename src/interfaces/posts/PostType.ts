import {CommentData} from "./CommentData";
import {Like} from "../props/PostProps";

export interface PostType {
  id: number;
  title: string;
  body: string;
  likes: Like[];
  comments: CommentData[];
}
