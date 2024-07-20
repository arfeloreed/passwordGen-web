import React, { useState } from "react";

// helper functions
function generate() {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";
  for (let i = 0; i < 15; i++) {
    res += str[Math.floor(Math.random() * str.length)];
  }
  return res;
}

function GenPass() {
  const [password, setPassword] = useState("");

  return (
    <div className="text-center">
      <input
        type="text"
        name="password"
        id="password"
        className="form-control form-control-lg"
        placeholder="Click generate to get your password"
        value={password}
        readOnly
      />
      <button
        type="button"
        className="btn btn-lg btn-success px-5 mt-2"
        onClick={() => setPassword(generate)}
      >
        GENERATE
      </button>
    </div>
  );
}

export default GenPass;
export { generate };
