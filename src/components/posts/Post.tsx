import {
  faComment,
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostProps } from "../../interfaces/props/PostProps";
import axios, {AxiosError} from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Button from "../ui/Button";
import {FormEvent, useState} from "react";
import {CommentValidationErrors} from "../../interfaces/posts/CommentValidationErrors";
import {CommentData} from "../../interfaces/posts/CommentData";

const Post = ({
  id,
  title,
  body,
  likes,
  comments,
  classes,
  onDelete,
  onFeed,
  onLike,
}: PostProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [errors, setErrors] = useState<CommentValidationErrors>({});
  const hasUserLiked = likes.some((like) => like.user_id === user.id);
  const [comment, setComment] = useState<string>("");  // useState for comment

  const handleDelete = async () => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      const response = await axios.delete<{message: string}>(`http://localhost:8000/posts/${id}`);

      if (response.status === 200) {
        onDelete ? onDelete() : navigate("/");
      }
    } catch (error) {
      console.log("There was an error deleting a post.", error);
    }
  };

  const handleLike = async () => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      const response = await axios.post<{message: string}>(`http://localhost:8000/posts/${id}/like`);

      if (response.status === 200) {
        onLike ? onLike() : navigate("/");
      }
    } catch (error) {
      console.log("There was an error liking a post.", error);
    }
  }

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      const data: CommentData = {
        id: id,
        comment: comment,
      };

      const response = await axios.post<{message: string}>('http://localhost:8000/posts/comment', data);

      if (response.status === 200) {
        setComment('');
        onLike ? onLike() : navigate("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        errors: CommentValidationErrors;
      }>;
      if (axiosError.response && axiosError.response.status === 422) {
        setErrors(axiosError.response.data.errors);
      } else {
        console.log("There was an error commenting on a post.", error);
      }
    }
  }

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
      <p className='my-4'>{body}</p>
      <div className="mt-3 flex">
          <>
            {!onFeed ? (
                <p className="mr-4">{likes.length} <FontAwesomeIcon icon={faThumbsUp}/> Likes</p>
            ) : (
                <button className="mr-4" onClick={handleLike} disabled={hasUserLiked}>
                  {likes.length} <FontAwesomeIcon icon={faThumbsUp}/> Like
                </button>)}
            <p>
              {comments.length} <FontAwesomeIcon icon={faComment} /> Comments
            </p>
          </>
      </div>
      <div className="my-4">
        {comments.length > 0 && (
            <ul>
              {comments.map((comment: CommentData) => <li className='my-2 italic' key={comment.id}>{comment.comment}</li>)}
            </ul>
        )}
      </div>
      {onFeed && (
          <>
            {Object.keys(errors).length > 0 && (
                <ul className="my-3 text-red-600">
                  {errors.comment &&
                      errors.comment.map((error, index) => (
                          <li key={`title-error-${index}`}>{error}</li>
                      ))
                  }
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
                <Button classes='text-sm p-1 mt-2'>Add comment</Button>
              </form>
            </div></>
      )}
    </div>
  );
};

export default Post;
