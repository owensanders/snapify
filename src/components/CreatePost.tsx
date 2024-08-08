import Sidebar from "./ui/SideBar";
import Button from "./ui/Button";
import Input from "./ui/Input";

const CreatePost = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">Create Post</h1>
          <div className="w-1/2 mt-6">
            <form>
              <Input
                label="Title"
                id="title"
                name="title"
                type="text"
                required
                showRequired
              />
              <div className="mt-3">
                <label
                  htmlFor="about"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="about"
                  name="about"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <Button classes="mt-3">Create post</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
