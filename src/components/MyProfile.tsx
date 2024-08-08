import Sidebar from "./SideBar";
import Button from "./ui/Button";
import Input from "./ui/Input";

const MyProfile: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-white shadow-xl border m-6 p-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="w-1/2 mt-6">
            <form>
              <Input
                label="Username"
                id="username"
                name="username"
                type="text"
              />
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                classes="mt-3"
              />
              <Input
                label="First name"
                id="first-name"
                name="first-name"
                type="text"
                classes="mt-3"
              />
              <Input
                label="Last name"
                id="last-name"
                name="last-name"
                type="text"
                classes="mt-3"
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
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="photo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <svg
                    className="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>
              <Button classes="mt-3">Update profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
