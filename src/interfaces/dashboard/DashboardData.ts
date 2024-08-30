import {PostType} from "../posts/PostType";

export interface DashboardData {
    total_posts: number;
    total_likes: number;
    total_comments: number;
    most_recent_post: PostType | null;
    post_with_most_likes: PostType | null;
}