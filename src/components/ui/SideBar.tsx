import {
  faDoorOpen,
  faFile,
  faHome,
  faPenToSquare,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="bg-blue-600 min-h-screen p-4 flex-shrink-0 pr-10"
      style={{ width: "max-content" }}
    >
      <ul className="text-white ml-2">
        <li className="mb-10 mt-5 text-center">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          />
        </li>
        <li className="my-10">
          <Link to="/dashboard" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-4 min-w-[20px]" />
            <span className="whitespace-nowrap">Dashboard</span>
          </Link>
        </li>
        <li className="my-10">
          <Link to="/my-profile" className="flex items-center">
            <FontAwesomeIcon icon={faPerson} className="mr-4 min-w-[20px]" />
            <span className="whitespace-nowrap">My Profile</span>
          </Link>
        </li>
        <li className="my-10">
          <Link to="/my-posts" className="flex items-center">
            <FontAwesomeIcon icon={faFile} className="mr-4 min-w-[20px]" />
            <span className="whitespace-nowrap">My Posts</span>
          </Link>
        </li>
        <li className="my-10">
          <Link to="/create-post" className="flex items-center">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mr-4 min-w-[20px]"
            />
            <span className="whitespace-nowrap">Create A Post</span>
          </Link>
        </li>
        <li className="my-10">
          <form onSubmit={handleLogout} className="flex items-center">
            <button
              type="submit"
              className="flex items-center text-white focus:outline-none"
            >
              <FontAwesomeIcon
                icon={faDoorOpen}
                className="mr-4 min-w-[20px]"
              />
              <span className="whitespace-nowrap">Logout</span>
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
