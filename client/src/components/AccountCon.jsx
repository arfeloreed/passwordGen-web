import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// context
import { PassGenContext } from "../context/PassGenContext";

function AccountCon({ email, password }) {
  const { setShowEdit } = useContext(PassGenContext);
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const res = await axios.delete(`${url}/account/delete/${id}`);
      if (res.data.message === "success") navigate(`/dashboard`);
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
      <div className="mt-4">
        <p className="mb-1">Email:</p>
        <input
          type="email"
          name="email"
          value={email || ""}
          readOnly
          className="form-control"
          autoComplete="false"
        />
        <p className="mb-1 mt-3">Password:</p>
        <input
          type="text"
          name="password"
          value={password || ""}
          readOnly
          className="form-control"
          autoComplete="false"
        />
      </div>

      <div className="mt-3 mb-4 d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-success px-4 mt-2 mt-sm-0"
          onClick={() => setShowEdit(true)}
        >
          EDIT
        </button>
        <button
          type="button"
          className="btn btn-danger px-4 mt-2 mt-sm-0"
          onClick={handleDelete}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default AccountCon;
