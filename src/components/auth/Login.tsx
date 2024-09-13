import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginValidationErrors } from "../../interfaces/auth/LoginValidationErrors";
import { LoginData } from "../../interfaces/auth/LoginData";
import { LoginUseCase } from "../../use-cases/LoginUseCase";
import { AuthRepository } from "../../repositories/AuthRepository";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const loginUseCase = new LoginUseCase(new AuthRepository());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loginData: LoginData = { email, password };
    const result = await loginUseCase.execute(loginData);

    if ("errors" in result) {
      setErrors(result.errors);
      setLoading(false);
    } else {
      dispatch(
        login({
          id: result.user?.id,
          name: result.user?.name,
          email: result.user?.email,
          about: result.user?.about,
        })
      );
      setLoading(false);
      navigate("/dashboard");
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
