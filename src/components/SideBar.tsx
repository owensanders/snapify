import {
  faCog,
  faFile,
  faHome,
  faPenToSquare,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div
      className="bg-blue-600 min-h-screen p-4 flex-shrink-0 pr-10"
      style={{ width: "max-content" }}
    >
      <ul className="text-white ml-2">
        <li className="my-10">
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-4" />
            Dashboard
          </Link>
        </li>
        <li className="my-10">
          <Link to="/my-profile" className="flex items-center">
            <FontAwesomeIcon icon={faPerson} className="mr-4" />
            My Profile
          </Link>
        </li>
        <li className="my-10">
          <Link to="/my-posts" className="flex items-center">
            <FontAwesomeIcon icon={faFile} className="mr-4" /> My Posts
          </Link>
        </li>
        <li className="my-10">
          <Link to="/create-post" className="flex items-center">
            <FontAwesomeIcon icon={faPenToSquare} className="mr-4" /> Create A
            Post
          </Link>
        </li>
        <li className="my-10">
          <Link to="/settings" className="flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
