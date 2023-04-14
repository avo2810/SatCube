import React, { useEffect, useState } from "react";
import "./UserLists.css";

const UsersList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:8080/getAllUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  };

  const deleteUser = (id, firstName, lastName) => {
    if (
      window.confirm(`Are you sure you want to delete ${firstName} ${lastName}`)
    ) {
      fetch("http://localhost:8080/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userID: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUsers();
        });
    } else {
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="main-box clearfix">
            <div className="table-responsive">
              <h1>Lists of Current Users</h1>
              <table className="table user-list">
                <thead className="header-text">
                  <tr>
                    <th>
                      <span>User</span>
                    </th>
                    <th>
                      <span>Email</span>
                    </th>
                    <th>
                      <span>Subscription Status</span>
                    </th>
                    <th>
                      <span>Delete Account</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                          <p className="user-link">
                            {i.firstName} {i.lastName}
                          </p>
                          <span className="user-subhead">{i.userType}</span>
                        </td>
                        <td>{i.email}</td>

                        <td style={{ textAlign: "center" }}>
                          {i.userType === "Regular User" && (
                            <span style={{ fontWeight: "normal" }}>None</span>
                          )}
                          {i.userType === "Subscribed User" && (
                            <span style={{ fontWeight: "normal" }}>Yes</span>
                          )}
                          {i.userType === "Super Admin" && (
                            <span style={{ fontWeight: "normal" }}>Owner</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="table-link danger"
                            onClick={() =>
                              deleteUser(i._id, i.firstName, i.lastName)
                            }
                          >
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersList;
