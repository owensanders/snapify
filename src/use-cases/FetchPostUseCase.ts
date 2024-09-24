import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";
import { PostType } from "../interfaces/posts/PostType";

export class FetchPostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(id: string): Promise<PostType> {
    return this.postRepository.getPostById(id);
  }
}
