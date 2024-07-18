import React from "react";
import {
  faGithub,
  faSquareXTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
// components
import Navbar from "../components/Navbar";
import GenPass from "../components/GenPass";

function Home() {
  const year = new Date().getFullYear();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();

  async function connect(body) {
    try {
      const check = await axios.get(`${url}/users/${body.email}`);
      if (check.data.message === "register") {
        const res = await axios.post(`${url}/register/google`, body);
        if (res.data.message === "success") {
          handleUser(res.data.token);
        } else {
          console.log("Internal server error for registration.");
          alert("Can't register or login. Try again.");
        }
      } else if (check.data.message === "login") {
        const res = await axios.post(`${url}/login/google`, body);
        if (res.data.message === "success") {
          handleUser(res.data.token);
        } else {
          console.log("No record for user.");
          alert("Can't register or login. Try again.");
        }
      } else {
        console.log("Error checking email.");
        alert("Can't register or login. Try again.");
      }
    } catch (err) {
      console.log(err.message);
      alert("Can't register or login. Try again.");
    }
  }

  function handleUser(token) {
    const decodedToken = jwtDecode(token);
    if (
      signIn({
        auth: {
          token: token,
          type: "Bearer",
        },
        userState: {
          uid: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
        },
      })
    ) {
      navigate("/dashboard");
    } else alert("Can't register or login. Try again.");
  }

  return (
    <>
      <Navbar />
      <div id="homeCon">
        <div className="container text-light z-1 position-relative">
          <div className="py-5 d-flex flex-column align-items-center text-center">
            <h1 className="display-4">Generate your password</h1>
            <div className="mt-5 genpassBlock">
              <GenPass />
            </div>
          </div>

          {/* google authentication */}
          {!isAuth && (
            <>
              <div className="d-flex flex-column align-items-center text-center mb-5">
                <p>Login or register to manage your account:</p>
                <div className="d-inline-block">
                  <GoogleLogin
                    text="continue_with"
                    logo_alignment="center"
                    onSuccess={(res) => {
                      const credentials = jwtDecode(res.credential);
                      const body = {
                        name: credentials.name.toLowerCase(),
                        email: credentials.email,
                        google_id: credentials.sub,
                      };
                      connect(body);
                    }}
                    onError={() => {
                      console.log("Error connecting to google.");
                      alert("Error connecting to google.");
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="footer text-light text-center">
          <p className="h5">Get in touch!</p>
          <div className="socials mb-4">
            <a href="https://twitter.com/ReedTorralba" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faSquareXTwitter} />
            </a>
            <a
              href="https://www.instagram.com/reedtorz/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/in/arfeloreed/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://github.com/arfeloreed" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <p>Copyright © {year} Arfelo Reed</p>
        </div>
      </div>
    </>
  );
}

export default Home;
