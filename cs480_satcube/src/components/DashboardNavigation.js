import { Link } from "react-router-dom";
import "./DashboardNavigation.css";
import React, { useEffect, useState } from "react";

const MainNavigation = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/userData", {
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
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <Link to="/dashboard" className="text">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/userInfo" className="text">
              User Information
            </Link>
          </li>
          {admin ? (
            <li>
              <Link to="/user-lists" className="text">
                User Lists
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <button onClick={logOut} className="logout">
        Log Out
      </button>
    </header>
  );
};

export default MainNavigation;
