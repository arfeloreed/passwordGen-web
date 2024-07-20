import React, { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
// components
import { generate } from "../components/GenPass";

function AddPass() {
  const auth = useAuthUser();
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const url = process.env.REACT_APP_URL || "http://localhost:5000";

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      website,
      email,
      password,
    };
    try {
      const res = await axios.post(`${url}/${auth.uid}/add/password`, body);
      if (res.data.message === "success") {
        setWebsite("");
        setEmail("");
        setPassword("");
      } else alert("Can't store password, try again.");
    } catch (err) {
      console.log(err.message);
      alert("Can't store password, try again.");
    }
  }

  return (
    <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <p>Generate a password for a new account:</p>
        <form className="genpassBlock" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              name="website"
              id="website"
              placeholder="Enter site name..."
              className="form-control"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="form-control"
              autoComplete="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-2">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Clink generate to get password..."
              className="form-control"
              value={password}
              readOnly
              required
            />
            <button
              type="button"
              className="input-group-text btn btn-secondary"
              onClick={() => setPassword(generate)}
            >
              GENERATE
            </button>
          </div>

          <button type="submit" className="btn btn-success px-5">
            CREATE
          </button>
        </form>
      </div>
    </>
  );
}

export default AddPass;
