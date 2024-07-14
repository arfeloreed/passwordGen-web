import React, { useState } from "react";

function GenPass() {
  const [password, setPassword] = useState("");

  // helper functions
  function generate() {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let res = "";
    for (let i = 0; i < 15; i++) {
      res += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(res);
  }

  return (
    <div className="text-center">
      <input
        type="text"
        name="password"
        id="password"
        className="form-control form-control-lg"
        placeholder="Click generate to get your password"
        value={password}
      />
      <button
        type="button"
        className="btn btn-lg btn-success px-5 mt-2"
        onClick={generate}
      >
        GENERATE
      </button>
    </div>
  );
}

export default GenPass;