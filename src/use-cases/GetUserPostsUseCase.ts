import { PostContract } from "../interfaces/posts/PostContract";
import { PostType } from "../interfaces/posts/PostType";

export class GetUserPostsUseCase {
  constructor(private postRepository: PostContract) {}

  async execute(userId: number): Promise<PostType[]> {
    return await this.postRepository.getUserPosts(userId);
  }
}
