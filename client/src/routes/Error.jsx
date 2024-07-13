import React from "react";
import { useNavigate } from "react-router";
// assets
import errorGif from "../assets/images/404.gif";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="text-bg-danger min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="text-center">
          <img
            src={errorGif}
            alt="404  gif"
            className="rounded img-fluid"
            style={{ maxWidth: "650px", width: "100%" }}
          />
        </div>

        <div className="mt-5 text-center">
          <h1 className="display-3">Oops!</h1>
          <p className="lead mt-3">
            The page you are looking for might have been removed, had its name changed or
            is temporarily unavailable.
          </p>
          <button
            className="btn btn-light btn-lg mt-5 px-5"
            onClick={() => navigate("/")}
          >
            HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
