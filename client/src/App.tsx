import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/Error/ErrorPage";
import Root from "./pages/Root/Root";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Create from "./pages/Create/Create";

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
        path: "Create",
        element: <Create />,
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

//inspiration : https://game-host.pl/
function App() {
  return <></>;
}

export default App;
