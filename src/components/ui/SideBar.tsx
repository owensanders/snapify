import {
  faDoorOpen,
  faFile,
  faHome,
  faList,
  faPenToSquare,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { FormEvent } from "react";
import { LogoutUseCase } from "../../use-cases/LogoutUseCase";
import { AuthRepository } from "../../repositories/AuthRepository";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logoutUseCase = new LogoutUseCase(new AuthRepository());

  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logoutUseCase.execute();
      dispatch(logout());
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
        <li className="my-10">
          <Link to="/dashboard" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-4 min-w-[20px]" />
            <span className="whitespace-nowrap">Dashboard</span>
          </Link>
        </li>
        <li className="my-10">
          <Link to="/my-feed" className="flex items-center">
            <FontAwesomeIcon icon={faList} className="mr-4 min-w-[20px]" />
            <span className="whitespace-nowrap">My Feed</span>
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
