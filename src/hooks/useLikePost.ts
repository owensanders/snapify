import { PostRepository } from "../repositories/PostRepository";
import { LikePostUseCase } from "../use-cases/LikePostUseCase";

export const useLikePostUseCase = () => {
  const postRepository = new PostRepository();
  return new LikePostUseCase(postRepository);
};
