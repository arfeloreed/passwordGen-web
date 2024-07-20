import React, { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
// components
import Navbar from "../components/Navbar";
import AddPass from "../components/AddPass";
import Account from "../components/Account";

function Dashboard() {
  const year = new Date().getFullYear();
  const auth = useAuthUser();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [accounts, setAccounts] = useState([]);

  async function getAccounts() {
    try {
      const res = await axios.get(`${url}/dashboard/${auth.uid}/passwords`);
      if (res.data.message === "success") {
        setAccounts(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
      alert("Error connecting to server.");
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <Navbar />
      <div id="dashboardCon" className="py-5">
        <div className="container">
          <p className="h3">Hi, {auth.name}</p>
          <p className="lead">Manage your Passwords!</p>
          <AddPass />
        </div>

        <div className="container my-5 genpassBlock">
          <p>All accounts:</p>
          {accounts.map((account) => {
            return (
              <Account
                key={account.password_id}
                website={account.website}
                email={account.email}
              />
            );
          })}
        </div>

        <div className="footer text-center">
          <p>Copyright © {year} Arfelo Reed</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
