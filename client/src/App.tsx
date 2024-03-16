import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { router } from "./route";

//inspiration : https://game-host.pl/
function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </>
  );
}

export default App;
