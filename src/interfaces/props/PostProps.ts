export interface PostProps {
  id: number;
  title: string;
  body: string;
  likes: number;
  comments: number;
  classes?: string;
  onDelete?: () => void;
  onFeed?: boolean;
}
