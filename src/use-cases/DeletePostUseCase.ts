import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";

export class DeletePostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(postId: number) {
    return this.postRepository.deletePost(postId);
  }
}
