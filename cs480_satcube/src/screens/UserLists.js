import React, { Component, useEffect, useState } from "react";
import "./UserLists.css";

const UsersList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getAllUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h1>Lists of Current Users</h1>
        <table style={{ width: 500 }}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Delete Account</th>
            </tr>
            {data.map((i) => {
              return (
                <tr>
                  <td>
                    {i.firstName} {i.lastName}
                  </td>
                  <td>{i.email}</td>
                  <td>{i.userType} </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <a className="btn btn-primary button" href="./dashboard">
          Return to dashboard
        </a>
      </div>
    </div>
  );
};
export default UsersList;
