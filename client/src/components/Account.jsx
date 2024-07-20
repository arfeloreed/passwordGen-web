import React from "react";

function Account({ website, email }) {
  return (
    <div className="input-group mb-1">
      <span className="input-group-text">Website</span>
      <input type="text" className="form-control" readOnly value={website} />
      <span className="input-group-text">Email</span>
      <input type="text" className="form-control" readOnly value={email} />
    </div>
  );
}

export default Account;
