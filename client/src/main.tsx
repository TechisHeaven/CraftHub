import React from "react";
import ReactDOM from "react-dom/client";
import App, { router } from "./App.tsx";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      /> */}
    </BrowserRouter>
  </React.StrictMode>
);
