import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";

export class CommentPostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(postId: number, comment: string) {
    return this.postRepository.commentPost(postId, comment);
  }
}
