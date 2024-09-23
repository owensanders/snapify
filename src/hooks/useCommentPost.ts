import { PostRepository } from "../repositories/PostRepository";
import { CommentPostUseCase } from "../use-cases/CommentPostUseCase";

export const useCommentPostUseCase = () => {
  const postRepository = new PostRepository();
  return new CommentPostUseCase(postRepository);
};
