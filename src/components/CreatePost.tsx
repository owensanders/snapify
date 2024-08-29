import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CreatePostValidationErrors } from "../interfaces/posts/CreatePostValidationErrors";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { CreatePostData } from "../interfaces/posts/CreatePostData";
import { CreatePostResponse } from "../interfaces/posts/CreatePostResponse";
import Sidebar from "./ui/SideBar";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [errors, setErrors] = useState<CreatePostValidationErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setSuccess(null);

    const data: CreatePostData = {
      title,
      body,
    };

    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      const response = await axios.post<CreatePostResponse>(
        "http://localhost:8000/posts/create",
        data
      );

      if (response.status === 200) {
        setSuccess("Post created successfully.");
        setTitle("");
        setBody("");
        setTimeout(() => navigate("/my-posts"), 2000);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        errors: CreatePostValidationErrors;
      }>;
      if (axiosError.response && axiosError.response.status === 422) {
        setErrors(axiosError.response.data.errors);
      } else {
        console.error("Post creation failed:", axiosError.message);
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
          <h1 className="text-3xl font-bold">Create Post</h1>
          <div className="w-1/2 mt-6">
            <form onSubmit={handleSubmit}>
              {success && <p className="text-green-600 mb-4">{success}</p>}
              {Object.keys(errors).length > 0 && (
                <ul className="mb-4 text-red-600">
                  {errors.title &&
                    errors.title.map((error, index) => (
                      <li key={`title-error-${index}`}>{error}</li>
                    ))}
                  {errors.body &&
                    errors.body.map((error, index) => (
                      <li key={`body-error-${index}`}>{error}</li>
                    ))}
                </ul>
              )}
              <div className="mb-4">
                <Input
                  label="Title"
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  showRequired
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="body"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="body"
                  name="body"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-start items-center">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
