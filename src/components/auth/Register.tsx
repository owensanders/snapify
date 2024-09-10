import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RegisterValidationErrors } from "../../interfaces/auth/RegisterValidationErrors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";
import { RegisterUseCase } from "../../useCases/RegisterUseCase";
import { AuthRepository } from "../../repositories/AuthRepository";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<RegisterValidationErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const registerUseCase = new RegisterUseCase(new AuthRepository());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const registerData = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    const result = await registerUseCase.execute(registerData);

    if ("errors" in result) {
      setErrors(result.errors);
    } else {
      const user = result.user;
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

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="p-8 bg-white rounded shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            <ul className="mb-4 text-red-600">
              {errors.name &&
                errors.name.map((error: string, index: number) => (
                  <li key={`name-error-${index}`}>{error}</li>
                ))}
              {errors.email &&
                errors.email.map((error: string, index: number) => (
                  <li key={`email-error-${index}`}>{error}</li>
                ))}
              {errors.password &&
                errors.password.map((error: string, index: number) => (
                  <li key={`password-error-${index}`}>{error}</li>
                ))}
              {errors.password_confirmation &&
                errors.password_confirmation.map(
                  (error: string, index: number) => (
                    <li key={`password-confirmation-error-${index}`}>
                      {error}
                    </li>
                  )
                )}
            </ul>
          )}
          <div className="mb-4">
            <Input
              label="Full name"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              showRequired
            />
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showRequired
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showRequired
            />
          </div>
          <div className="mb-6">
            <Input
              label="Confirm password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showRequired
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <Button disabled={loading}>Register</Button>
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
