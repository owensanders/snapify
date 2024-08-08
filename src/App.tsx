import { Link, Outlet } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <nav className="w-full bg-blue-600 h-14 flex justify-between items-center px-4">
        <h1 className="text-white text-3xl font-bold">Snapify</h1>
        <div className="flex space-x-7">
          <Link to="/" className="text-white hover:text-blue-300">
            Dashboard
          </Link>
          <Link to="/login" className="text-white hover:text-blue-300">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-blue-300">
            Register
          </Link>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
