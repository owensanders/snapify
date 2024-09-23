import { PostRepository } from "../repositories/PostRepository";
import { DeletePostUseCase } from "../use-cases/DeletePostUseCase";

export const useDeletePostUseCase = () => {
  const postRepository = new PostRepository();
  return new DeletePostUseCase(postRepository);
};
