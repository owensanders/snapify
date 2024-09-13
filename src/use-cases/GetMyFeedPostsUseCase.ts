import { FeedRepositoryContract } from "../interfaces/my-feed/FeedRepositoryContract";
import { PostType } from "../interfaces/posts/PostType";

export class GetMyFeedPostsUseCase {
  constructor(private $feedRepository: FeedRepositoryContract) {}

  async execute(): Promise<{ posts: PostType[] }> {
    return await this.$feedRepository.fetchPosts();
  }
}
