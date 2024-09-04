import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginValidationErrors } from "../../interfaces/auth/LoginValidationErrors";
import { LoginResponse } from "../../interfaces/auth/LoginResponse";
import { LoginData } from "../../interfaces/auth/LoginData";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";
import { useApi } from "../../hooks/useApi";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    data,
    error,
    fetchData: loginAttempt,
    loading,
  } = useApi<LoginResponse, { errors: LoginValidationErrors }>(
    {
      url: "http://localhost:8000/login",
      method: "post",
      data: {
        email,
        password,
      } as LoginData,
    },
    { manual: true, isAuthRequest: true }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginAttempt();
  };

  useEffect(() => {
    if (data) {
      const user = data.user;

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
    } else if (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  }, [data, error, dispatch, navigate]);

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
            <Button disabled={loading}>Login</Button>
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
