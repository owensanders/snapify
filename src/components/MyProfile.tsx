import Sidebar from "./ui/SideBar";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { UpdateProfileValidationErrors } from "../interfaces/my-profile/UpdateProfileValidationErrors";
import { updateProfile } from "../store/slices/authSlice";
import { UserRepository } from "../repositories/UserRepository";
import { UpdateProfileUseCase } from "../use-cases/UpdateProfileUseCase";

const MyProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [about, setAbout] = useState(user.about ?? "");
  const [errors, setErrors] = useState<UpdateProfileValidationErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);
    setLoading(true);

    const userRepository = new UserRepository();
    const updateProfileUseCase = new UpdateProfileUseCase(userRepository);

    try {
      const response = await updateProfileUseCase.execute({
        name,
        email,
        about,
      });

      dispatch(
        updateProfile({
          id: response?.user?.id,
          name: response?.user?.name,
          email: response?.user?.email,
          about: response?.user?.about,
        })
      );
      setSuccess("Profile updated successfully.");

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        console.error("Profile update failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="w-1/2 mt-6">
            <form onSubmit={handleSubmit}>
              {success && <p className="text-green-600 mb-4">{success}</p>}
              {Object.keys(errors).length > 0 && (
                <ul className="mb-4 text-red-600">
                  {errors.name &&
                    errors.name.map((error, index) => (
                      <li key={`name-error-${index}`}>{error}</li>
                    ))}
                  {errors.email &&
                    errors.email.map((error, index) => (
                      <li key={`email-error-${index}`}>{error}</li>
                    ))}
                  {errors.about &&
                    errors.about.map((error, index) => (
                      <li key={`about-error-${index}`}>{error}</li>
                    ))}
                </ul>
              )}
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                classes="mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Name"
                id="name"
                name="name"
                type="text"
                classes="mt-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="mt-3">
                <label
                  htmlFor="about"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={about}
                  placeholder="Enter something about yourself..."
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <Button classes="mt-3">
                {loading ? "Updating..." : "Update profile"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
