import React, { createContext, useState } from "react";

const PassGenContext = createContext();
function PassGenContextProvider(props) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <PassGenContext.Provider value={{ showEdit, setShowEdit }}>
      {props.children}
    </PassGenContext.Provider>
  );
}

export { PassGenContext, PassGenContextProvider };
