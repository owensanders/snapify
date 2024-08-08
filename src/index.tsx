import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import MyPosts from "./components/MyPosts";
import CreatePost from "./components/CreatePost";
import MyProfile from "./components/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
