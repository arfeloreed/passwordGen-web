import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// components
import Navbar from "../components/Navbar";
import GenPass from "../components/GenPass";

function Dashboard() {
  const year = new Date().getFullYear();
  const auth = useAuthUser();

  return (
    <>
      <Navbar />
      <div id="dashboardCon">
        <div className="container">
          <h1>Welcome to Dashboard!</h1>
          <div className="py-5 d-flex justify-content-center">
            <div className="genpassBlock">
              <GenPass />
            </div>
          </div>
        </div>
        <div className="footer text-center">
          <p>Copyright © {year} Arfelo Reed</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
