import React, { Component, useEffect, useState } from "react";
import "./UserLists.css";
import {faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = () =>{
    fetch("http://localhost:4000/getAllUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }

  const deleteUser =(id, firstName, lastName) =>{
    if(window.confirm(`Are you sure you want to delete ${firstName} ${lastName}`)) {
      fetch("http://localhost:4000/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userID: id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data)
        getAllUsers()
      })
    } else {

    }
  }
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
                  <td>
                    <FontAwesomeIcon icon={faTrash} onClick={()=>deleteUser(i._id, i.firstName, i.lastName)}/>
                  </td>
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
