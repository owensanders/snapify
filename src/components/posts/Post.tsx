import {
  faComment,
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostProps } from "../../interfaces/props/PostProps";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

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

  const hasUserLiked = likes.some((like) => like.user_id === user.id);

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
        {!onFeed ? (
          <>
            <p className="mr-4">
              {likes.length} <FontAwesomeIcon icon={faThumbsUp} /> Likes
            </p>
            <p>
              {comments.length} <FontAwesomeIcon icon={faComment} /> Comments
            </p>
          </>
        ) : (
          <>
            <button className="mr-4" onClick={handleLike} disabled={hasUserLiked}>
              {likes.length} <FontAwesomeIcon icon={faThumbsUp} /> Like
            </button>
            <button>
              {comments.length} <FontAwesomeIcon icon={faComment} /> Comment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
