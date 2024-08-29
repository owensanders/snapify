import {
  faComment,
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostProps } from "../interfaces/props/PostProps";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = ({
  id,
  title,
  body,
  likes,
  comments,
  classes,
  onDelete,
}: PostProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      const response = await axios.delete(`http://localhost:8000/posts/${id}`);

      if (response.status === 200) {
        onDelete ? onDelete() : navigate("/");
      }
    } catch (error) {
      console.log("There was an error deleting a post.", error);
    }
  };

  return (
    <div className={`border rounded-md p-4 shadow-md ${classes}`}>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">{title}</h1>
        <div>
          <button
            className="mr-3"
            onClick={() => navigate(`/update-post/${id}`)}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <p>{body}</p>
      <div className="mt-3 flex">
        <p className="mr-4">
          {likes} <FontAwesomeIcon icon={faThumbsUp} /> Likes
        </p>
        <p>
          {comments} <FontAwesomeIcon icon={faComment} /> Commments
        </p>
      </div>
    </div>
  );
};

export default Post;
