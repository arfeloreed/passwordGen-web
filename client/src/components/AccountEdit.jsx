import React, { useContext, useState } from "react";
// context
import { PassGenContext } from "../context/PassGenContext";
// components
import { generate } from "../components/GenPass";

function AccountEdit({ email }) {
  const { setShowEdit } = useContext(PassGenContext);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");

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
            readOnly
            required
            className="form-control"
            value={password}
          />
          <button
            type="button"
            className="input-group-text btn btn-secondary"
            onClick={() => setPassword(generate)}
          >
            GENERATE
          </button>
        </div>
      </div>
      <div className="mt-3 mb-4 d-flex justify-content-around">
        <button type="button" className="btn btn-success px-4 mt-2 mt-sm-0">
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
    </div>
  );
}

export default AccountEdit;
