import { Link, Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      <nav className="w-full bg-blue-600 h-14 flex justify-between items-center px-4">
        <Link to="/dashboard">
          <h1 className="text-white text-3xl font-bold">Blogify</h1>
        </Link>
        <div className="flex space-x-7">
          <Link to="/login" className="text-white hover:text-blue-300">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-blue-300">
            Register
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
