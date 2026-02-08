import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import DocsLayout from "./docs/DocsLayout";
import "./styles.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/docs/*", element: <DocsLayout /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
