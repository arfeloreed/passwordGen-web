import React, { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// components
import Navbar from "../components/Navbar";
import AddPass from "../components/AddPass";
import Account from "../components/Account";

function Dashboard() {
  const year = new Date().getFullYear();
  const auth = useAuthUser();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");

  async function getAccounts() {
    try {
      const res = await axios.get(`${url}/dashboard/${auth.uid}/passwords`);
      if (res.data.message === "success") setAccounts(res.data.data);
    } catch (err) {
      console.log(err.message);
      alert("Error connecting to server.");
    }
  }

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  const searchAccounts =
    accounts.length > 0 &&
    accounts.filter((account) => account.website.toLowerCase().includes(search));

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
          <span className="search">
            <input
              type="search"
              placeholder="Search site name..."
              className="form-control mb-3 pe-5"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          {search ? (
            searchAccounts.length > 0 ? (
              searchAccounts.map((account) => {
                return (
                  <Account
                    key={account.password_id}
                    website={account.website}
                    email={account.email}
                  />
                );
              })
            ) : (
              <p>No account records.</p>
            )
          ) : (
            accounts.map((account) => {
              return (
                <Account
                  key={account.password_id}
                  website={account.website}
                  email={account.email}
                />
              );
            })
          )}
        </div>

        <div className="footer text-center">
          <p>Copyright © {year} Arfelo Reed</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
