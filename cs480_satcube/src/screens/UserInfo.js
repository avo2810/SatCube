import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = () => {
  const [userData, setUserData] = useState("");
  const createSession = async () => {
    axios
      .post("http://localhost:4000/create-checkout-session", { userData })
      .then((res) => (window.location.href = res.data.url))
      .catch((err) => console.error(err));
  };
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
        setUserData(data.data);
      });
  }, []);
  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h1>Account Information</h1>
        <h3>First Name: {userData.firstName}</h3>
        <h3>Last Name: {userData.lastName}</h3>
        <h3>Email: {userData.email}</h3>
        <h3>UserType: {userData.userType}</h3>
        <button className="checkout-button" onClick={() => createSession()}>
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default UserInfo;
//use this to fix the style: https://www.bootdey.com/snippets/view/Table-user-information
