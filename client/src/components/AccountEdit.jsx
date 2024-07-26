import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// context
import { PassGenContext } from "../context/PassGenContext";
// components
import { generate } from "../components/GenPass";

function AccountEdit({ email }) {
  const { setShowEdit } = useContext(PassGenContext);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit() {
    const body = {
      newEmail,
      password,
    };
    try {
      const res = await axios.patch(`${url}/update/password/${id}`, body);
      if (res.data.message === "success") navigate(`/account/${id}`);
    } catch (err) {
      console.log(err.message);
      alert("Error connecting to server.");
    }
  }

  return (
    <div
      className="border rounded mt-5 p-4 mx-auto"
      style={{ maxWidth: "500px", backdropFilter: "blur(5px)" }}
    >
      <form className="mt-4" onSubmit={() => handleSubmit()}>
        <p className="mb-1">Email:</p>
        <input
          type="email"
          name="email"
          value={newEmail || ""}
          className="form-control"
          autoComplete="true"
          required
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <p className="mb-1 mt-3">Password:</p>

        <div className="input-group">
          <input
            type="text"
            name="password"
            placeholder="Generate new password..."
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

        <div className="mt-3 mb-4 d-flex justify-content-around">
          <button type="submit" className="btn btn-success px-4 mt-2 mt-sm-0">
            SUBMIT
          </button>
          <button
            type="button"
            className="btn btn-danger px-4 mt-2 mt-sm-0"
            onClick={() => setShowEdit(false)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountEdit;
