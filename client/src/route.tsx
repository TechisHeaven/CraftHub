import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Servers from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Server from "./pages/Server/Server";
import Main from "./layout/main";
import Root from "./layout/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "pricing",
        element: <div>pricing</div>,
      },
      {
        path: "servers",
        element: <Servers />,
      },
      {
        path: "server",
        element: <Main />,
        children: [
          {
            path: ":id",
            element: <Server />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
