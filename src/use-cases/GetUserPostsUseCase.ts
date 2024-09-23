import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";
import { PostType } from "../interfaces/posts/PostType";

export class GetUserPostsUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(userId: number): Promise<PostType[]> {
    return await this.postRepository.getUserPosts(userId);
  }
}
