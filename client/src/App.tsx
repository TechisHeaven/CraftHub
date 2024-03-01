import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
    //   // Our root route always provides the user, if logged in
    //   return { user: fakeAuthProvider.username };
    // },
    // Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //   path: "login",
      //   action: loginAction,
      //   loader: loginLoader,
      //   Component: LoginPage,
      // },
      {
        path: "login",
        // loader: protectedLoader,
        Component: Home,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      // await fakeAuthProvider.signout();
      // return redirect("/");
    },
  },
]);

//inspiration : https://game-host.pl/
function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
