import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostProps } from "../../interfaces/props/PostProps";

const Post: React.FC<PostProps> = ({ title, body, likes, comments }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h1 className="text-lg font-bold">{title}</h1>
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
