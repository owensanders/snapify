import { PostRepositoryContract } from "../interfaces/posts/PostRepositoryContract";
import { CreatePostData } from "../interfaces/posts/CreatePostData";
import { CreatePostResponse } from "../interfaces/posts/CreatePostResponse";

export class CreatePostUseCase {
  constructor(private postRepository: PostRepositoryContract) {}

  async execute(data: CreatePostData): Promise<CreatePostResponse> {
    return await this.postRepository.createPost(data);
  }
}
