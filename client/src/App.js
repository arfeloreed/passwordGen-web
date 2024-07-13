import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// routes
import Home from "./routes/Home";
import Error from "./routes/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
