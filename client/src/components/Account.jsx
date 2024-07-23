import React from "react";
import { Link } from "react-router-dom";

function Account({ website, email, id }) {
  return (
    <Link className="input-group mb-1 text-decoration-none" to={`/account/${id}`}>
      <span className="input-group-text">Website</span>
      <div className="form-control overflow-hidden">{website}</div>
      <span className="input-group-text">Email</span>
      <div className="form-control overflow-hidden">{email}</div>
    </Link>
  );
}

export default Account;
