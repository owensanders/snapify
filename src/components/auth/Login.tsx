import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios, { AxiosError } from "axios";
import { LoginValidationErrors } from "../../interfaces/auth/LoginValidationErrors";
import { LoginResponse } from "../../interfaces/auth/LoginResponse";
import { LoginData } from "../../interfaces/auth/LoginData";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      const data: LoginData = {
        email: email,
        password: password,
      };

      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/login",
        data
      );

      if (response.status === 200) {
        const user = response.data?.user;
        setErrors({});
        dispatch(
          login({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            about: user?.about,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ errors: LoginValidationErrors }>;
      if (axiosError.response && axiosError.response.status === 422) {
        setErrors(axiosError.response.data.errors);
      } else {
        console.error("Login failed:", axiosError.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="p-8 bg-white rounded shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            <ul className="mb-4 text-red-600">
              {errors.email &&
                errors.email.map((error, index) => (
                  <li key={`email-error-${index}`}>{error}</li>
                ))}
              {errors.password &&
                errors.password.map((error, index) => (
                  <li key={`password-error-${index}`}>{error}</li>
                ))}
            </ul>
          )}
          <div className="mb-4">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <Button>Login</Button>
            <Link to="/register">
              <p className="text-center text-blue-600 hover:text-blue-800 cursor-pointer">
                Don't have an account? Sign up here.
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
