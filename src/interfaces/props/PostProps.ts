export interface PostProps {
  id: number;
  title: string;
  body: string;
  likes: Like[];
  comments: [];
  classes?: string;
  onDelete?: () => void;
  onFeed?: boolean;
  onLike?: () => void;
}

interface Like {
  id: number;
  post_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
}
