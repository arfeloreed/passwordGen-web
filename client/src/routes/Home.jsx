import React from "react";
import {
  faGithub,
  faSquareXTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components
import Navbar from "../components/Navbar";
import GenPass from "../components/GenPass";

function Home() {
  const year = new Date().getFullYear();

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

          <div className="footer text-center">
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
      </div>
    </>
  );
}

export default Home;
