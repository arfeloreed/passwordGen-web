import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// context
import { PassGenContext } from "../context/PassGenContext";
// components
import Navbar from "../components/Navbar";
import AccountCon from "../components/AccountCon";
import AccountEdit from "../components/AccountEdit";
import PrevPass from "../components/PrevPass";

function AccountDetail() {
  const { id } = useParams();
  const year = new Date().getFullYear();
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const [data, setData] = useState({});
  const [passwords, setPasswords] = useState([]);
  const { showEdit } = useContext(PassGenContext);

  const getAccount = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/dashboard/account/${id}`);
      // if message is success, set data and previous passwords
      if (res.data.message === "success") {
        setData(res.data.data);
        setPasswords(res.data.prevPasswords);
      } else alert("Error connecting to server.");
    } catch (err) {
      console.log(err.message);
      alert("Error connecting to server.");
    }
  }, [url, id]);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  return (
    <>
      <Navbar />
      <div id="accountDetailCon">
        <div className="container py-5">
          <p className="h3">Account detail for {data.website}</p>

          {showEdit ? (
            <AccountEdit email={data.email} />
          ) : (
            <AccountCon email={data.email} password={data.password} />
          )}

          <div className="genpassBlock mx-auto my-4">
            <p className="lead">Previous passwords:</p>
            {passwords.length > 0 ? (
              passwords.map((pass) => {
                return <PrevPass key={pass.password} password={pass.password} />;
              })
            ) : (
              <p>No previous passwords.</p>
            )}
          </div>
        </div>

        <div className="footer text-center">
          <p>Copyright © {year} Arfelo Reed</p>
        </div>
      </div>
    </>
  );
}

export default AccountDetail;
