import React from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate, useLocation } from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function Navbar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg text-bg-primary" data-bs-theme="dark">
      <div className="container my-1">
        <a href="/" className="navbar-brand">
          PasswordGen
        </a>

        {isAuth && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#myNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="offcanvas offcanvas-start"
              id="myNav"
              tabIndex={-1}
              data-bs-scroll="true"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                ></button>
              </div>

              <div className="offcanvas-body">
                <ul className="navbar-nav nav-underline ms-auto align-items-center">
                  <li className="nav-item">
                    <a
                      href="/dashboard"
                      className={`nav-link ${
                        location.pathname === "/dashboard" && "active"
                      }`}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/"
                      className="nav-link"
                      onClick={() => {
                        signOut();
                        navigate("/");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
