import { CreatePostData } from "../interfaces/posts/CreatePostData";
import { CreatePostResponse } from "../interfaces/posts/CreatePostResponse";
import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(data: CreatePostData): Promise<CreatePostResponse> {
    return await this.postRepository.updatePost(data);
  }
}
