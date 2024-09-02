import Sidebar from "./ui/SideBar";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useApi } from "../hooks/useApi";
import { UpdateProfileValidationErrors } from "../interfaces/my-profile/UpdateProfileValidationErrors";
import { updateProfile } from "../store/slices/authSlice";

const MyProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [about, setAbout] = useState(user.about ?? "");
  const [errors, setErrors] = useState<UpdateProfileValidationErrors>({});
  const [success, setSuccess] = useState<string | null>(null);

  const { data, loading, error, fetchData } = useApi(
    {
      url: "http://localhost:8000/my-profile/update",
      method: "POST",
      data: { name, email, about },
    },
    { manual: true }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);
    await fetchData();
  };

  useEffect(() => {
    if (data?.user) {
      const user = data.user;
      setSuccess("Profile updated successfully.");
      dispatch(
        updateProfile({
          id: user.id,
          name: user.name,
          email: user.email,
          about: user.about,
        })
      );

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error?.response?.status === 422) {
      setErrors(error.response.data.errors);
    } else if (error) {
      console.error("Profile update failed:", error.message);
    }
  }, [error]);

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
                      <li key={`title-error-${index}`}>{error}</li>
                    ))}
                  {errors.email &&
                    errors.email.map((error, index) => (
                      <li key={`body-error-${index}`}>{error}</li>
                    ))}
                  {errors.about &&
                    errors.about.map((error, index) => (
                      <li key={`body-error-${index}`}>{error}</li>
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
