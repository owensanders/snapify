import {FormEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { CreatePostValidationErrors } from "../../interfaces/posts/CreatePostValidationErrors";
import { CreatePostData } from "../../interfaces/posts/CreatePostData";
import { CreatePostResponse } from "../../interfaces/posts/CreatePostResponse";
import Sidebar from "../ui/SideBar";
import { PostType } from "../../interfaces/posts/PostType";

const PostForm = ({
  post,
  isCreate,
  message,
}: {
  post?: PostType;
  isCreate: boolean;
  message: string;
}) => {
  const titleInitialValue = isCreate ? "" : post?.title;
  const bodyInitialValue = isCreate ? "" : post?.body;
  const [title, setTitle] = useState<string>(titleInitialValue || "");
  const [body, setBody] = useState<string>(bodyInitialValue || "");
  const [errors, setErrors] = useState<CreatePostValidationErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    data,
    error,
    fetchData: submitPost,
    loading,
  } = useApi<CreatePostResponse, { errors: CreatePostValidationErrors }>({
    url: isCreate ? "http://localhost:8000/posts/create" : "http://localhost:8000/posts/update",
    method: isCreate ? "post" : "put",
    data: {
      id: post?.id,
      title,
      body,
    } as CreatePostData,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    await submitPost();

    if (data) {
      setSuccess(message);
      setTitle("");
      setBody("");
      setTimeout(() => navigate("/my-posts"), 2000);
    }
  };

  useEffect(() => {
    if (error?.response?.status === 422) {
      setErrors(error.response.data.errors);
    } else if (error) {
      console.error("Post create or update failed:", error.message);
    }
  }, [error]);

  return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow bg-gray-100 p-6">
          <div className="bg-white shadow-xl border m-6 p-6">
            <h1 className="text-3xl font-bold">
              {isCreate ? "Create" : "Update"} Post
            </h1>
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
                    {loading
                        ? isCreate
                            ? "Creating..."
                            : "Updating..."
                        : isCreate
                            ? "Create Post"
                            : "Update Post"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PostForm;
