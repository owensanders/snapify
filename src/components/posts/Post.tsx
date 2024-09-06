import {
  faComment,
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostProps } from "../../interfaces/props/PostProps";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Button from "../ui/Button";
import { FormEvent, useState } from "react";
import { CommentValidationErrors } from "../../interfaces/posts/CommentValidationErrors";
import { CommentData } from "../../interfaces/posts/CommentData";

const Post = ({
  id,
  title,
  body,
  likes = [],
  comments = [],
  classes,
  onDelete,
  onFeed,
  onLike,
}: PostProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [comment, setComment] = useState<string>(""); // useState for comment
  const [errors, setErrors] = useState<CommentValidationErrors>({});
  const hasUserLiked = (likes || []).some((like) => like.user_id === user.id);

  const { fetchData: deletePost } = useApi<{ message: string }>({
    url: `http://localhost:8000/posts/${id}`,
    method: "DELETE",
  });

  const handleDelete = async () => {
    await deletePost();

    if (!onDelete) {
      navigate("/");
    } else {
      onDelete();
    }
  };

  const { fetchData: likePost } = useApi<{ message: string }>({
    url: `http://localhost:8000/posts/${id}/like`,
    method: "POST",
  });

  const handleLike = async () => {
    await likePost();

    if (!onLike) {
      navigate("/");
    } else {
      onLike();
    }
  };

  const { fetchData: commentPost, error: commentError } = useApi<
      { message: string },
      { errors: CommentValidationErrors }
  >({
    url: "http://localhost:8000/posts/comment",
    method: "POST",
    data: { id, comment },
  });

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    await commentPost();

    if (!commentError) {
      setComment("");
      if (!onLike) {
        navigate("/");
      } else {
        onLike();
      }
    } else if (commentError?.response?.status === 422) {
      setErrors(commentError.response.data.errors);
    } else {
      console.log("There was an error commenting on a post:", commentError.message);
    }
  };

  return (
      <div className={`border rounded-md p-4 shadow-md ${classes}`}>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">{title}</h1>
          <div>
            {!onFeed && (
                <>
                  <button
                      className="mr-3"
                      onClick={() => navigate(`/update-post/${id}`)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
            )}
          </div>
        </div>
        <p className="my-4">{body}</p>
        <div className="mt-3 flex">
          <>
            {!onFeed ? (
                <p className="mr-4">
                  {likes.length} <FontAwesomeIcon icon={faThumbsUp} /> Likes
                </p>
            ) : (
                <button
                    className="mr-4"
                    onClick={handleLike}
                    disabled={hasUserLiked}
                >
                  {likes.length} <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
            )}
            <p>
              {comments.length} <FontAwesomeIcon icon={faComment} /> Comments
            </p>
          </>
        </div>
        <div className="my-4">
          {comments.length > 0 && (
              <ul>
                {comments.map((comment: CommentData) => (
                    <li className="my-2 italic" key={comment.id}>
                      {comment.comment}
                    </li>
                ))}
              </ul>
          )}
        </div>
        {onFeed && (
            <>
              {Object.keys(errors).length > 0 && (
                  <ul className="my-3 text-red-600">
                    {errors.comment &&
                        errors.comment.map((error, index) => (
                            <li key={`comment-error-${index}`}>{error}</li>
                        ))}
                  </ul>
              )}
              <div className="mt-3">
                <form onSubmit={handleComment}>
                  <label
                      htmlFor="comment"
                      className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Comment
                  </label>
                  <textarea
                      id="comment"
                      name="comment"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                  />
                  <Button classes="text-sm p-1 mt-2">Add comment</Button>
                </form>
              </div>
            </>
        )}
      </div>
  );
};

export default Post;
