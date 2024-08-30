import {CommentData} from "../posts/CommentData";

export interface PostProps {
  id: number;
  title: string;
  body: string;
  likes: Like[];
  comments: CommentData[];
  classes?: string;
  onDelete?: () => void;
  onFeed?: boolean;
  onLike?: () => void;
}

export interface Like {
  id: number;
  post_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
}
