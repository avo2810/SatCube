import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = () => {
  const [userData, setUserData] = useState("");
  const [regularUser, setRegularUser] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  const createSession = async () => {
    axios
      .post("http://localhost:8080/create-checkout-session", { userData })
      .then((res) => (window.location.href = res.data.url))
      .catch((err) => console.error(err));
  };
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
        setUserData(data.data);

        //Identify the type of user to configure the subscription accordingly
        if (data.data.userType == "Regular User") {
          setRegularUser(true);
        }
        if (data.data.userType == "Subscribed User") {
          setSubscribedUser(true);
        }
        if (data.data.userType == "Super Admin") {
          setAdmin(true);
        }
      });
  }, []);
  return (
    // <div classNameName="auth-wrapper"
    //   <div classNameName="auth-inner" style={{ width: "auto" }}>
    //     <h1>Account Information</h1>
    //     <h3>First Name: {userData.firstName}</h3>
    //     <h3>Last Name: {userData.lastName}</h3>
    //     <h3>Email: {userData.email}</h3>
    //     <h3>UserType: {userData.userType}</h3>
    // <button classNameName="checkout-button" onClick={() => createSession()}>
    //   Subscribe
    // </button>
    //   </div>
    // </div>

    <div className="container bootstrap snippets bootdey">
      <div className="panel-body inf-content">
        <div className="row">
          <div className="col-md-4 img">
            <img
              alt=""
              style={{ width: 500, borderRadius: "50%" }}
              title=""
              className="img-circle img-thumbnail isTooltip"
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              data-original-title="Usuario"
            />
            {/* TODO: Allow user to edit information */}
            <button className="edit btn btn-link">Edit Information</button>
          </div>
          <div className="col-md-6">
            <h2>Information</h2>
            <div className="table-responsive info-table">
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-asterisk text-primary"></span>
                        Identificacion
                      </strong>
                    </td>
                    <td className="text-primary">{userData._id}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-user  text-primary"></span>
                        First Name
                      </strong>
                    </td>
                    <td className="text-primary">{userData.firstName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-cloud text-primary"></span>
                        Lastname
                      </strong>
                    </td>
                    <td className="text-primary">{userData.lastName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-eye-open text-primary"></span>
                        Role
                      </strong>
                    </td>
                    <td className="text-primary">{userData.userType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        Email
                      </strong>
                    </td>
                    <td className="text-primary">{userData.email}</td>
                  </tr>
                  {regularUser ? (
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Subscribe Status
                        </strong>
                      </td>
                      <td className="text-primary">
                        <button
                          className="btn btn-link"
                          onClick={() => createSession()}
                        >
                          Click here to Subscribe
                        </button>
                      </td>
                    </tr>
                  ) : null}
                  {subscribedUser ? (
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Subscribe Status
                        </strong>
                      </td>
                      <td className="text-primary">
                        <button
                          className="btn btn-link"
                          onClick={() => createSession()}
                        >
                          Click here to Unsubscribe
                        </button>
                      </td>
                    </tr>
                  ) : null}
                  {admin ? (
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Subscribe Status
                        </strong>
                      </td>
                      <td className="text-primary">Owner</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
//use this to fix the style: https://www.bootdey.com/snippets/view/Table-user-information
