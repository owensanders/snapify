import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";

export class LikePostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(postId: number) {
    return this.postRepository.likePost(postId);
  }
}
