import { FormEvent } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

const Register: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="p-8 bg-white rounded shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="First name"
              id="first-name"
              name="first-name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Last name"
              id="last-name"
              name="last-name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              label="Confirm password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <button className="w-full md:w-auto mb-2 rounded bg-blue-600 hover:bg-blue-800 px-4 py-2 md:mr-3 text-white">
              Register
            </button>
            <Link to="/login">
              <p className="text-center text-blue-600 hover:text-blue-800 cursor-pointer">
                Already have an account? Login here.
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
