import React, { useEffect, useState } from "react";
import UsersList from "./UserLists";

const Dashboard = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Super Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
      });
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h1>Welcome to SatCube Project</h1>
        <p>
          <a href="/userInfo">Account Information</a>
        </p>

        {admin ? <a href="./user-lists">User Lists</a> : null}
        <br />
        <button onClick={logOut} className="btn btn-primary">
          Log out
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
