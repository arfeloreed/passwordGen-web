import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
// context
import { PassGenContextProvider } from "./context/PassGenContext";
// routes
import Home from "./routes/Home";
import Error from "./routes/Error";
import Dashboard from "./routes/Dashboard";
import AccountDetail from "./routes/AccountDetail";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

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
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/account/:id",
      element: <AccountDetail />,
    },
  ]);

  return (
    <>
      <PassGenContextProvider>
        <AuthProvider store={store}>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <RouterProvider router={router} />
          </GoogleOAuthProvider>
        </AuthProvider>
      </PassGenContextProvider>
    </>
  );
}

export default App;
