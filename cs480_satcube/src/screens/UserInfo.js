import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = () => {
  const [userData, setUserData] = useState("");
  const [regularUser, setRegularUser] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [edit, setEdit] = useState(false);

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
        if (data.data.userType === "Regular User") {
          setRegularUser(true);
        }
        if (data.data.userType === "Subscribed User") {
          setSubscribedUser(true);
        }
        if (data.data.userType === "Super Admin") {
          setAdmin(true);
        }
      });
  }, []);

  const cancelSubscription = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );
    if (confirmation) {
      axios
        .post("http://localhost:8080/cancel-subscription", {
          stripeCustomerId: userData.stripeCustomerId,
          email: userData.email,
        })
        .then((res) => {
          alert("Subscription successfully canceled.");
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = () => {};

  return !edit ? (
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
            <button className="edit btn btn-link" onClick={() => setEdit(true)}>
              Edit Information
            </button>
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
                          onClick={() => cancelSubscription()}
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
  ) : (
    <div className="container bootstrap snippets bootdey ">
      <div className="panel-body inf-content ">
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
            {/* <!-- Profile picture help block--> */}
            <div className="small font-italic text-muted mb-3 image">
              JPG or PNG no larger than 5 MB
            </div>

            <button className="btn btn-primary image-button" type="button">
              Upload Image
            </button>
          </div>
          <div className="col-md-6">
            <h2>Information</h2>
            <div className="table-responsive info-table">
              <table className="table table-user-information">
                <tbody>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-asterisk text-primary"></span>
                        Identificacion
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        value={userData._id}
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-user  text-primary"></span>
                        First Name
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userData.firstName}
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-cloud text-primary"></span>
                        Lastname
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userData.lastName}
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-eye-open text-primary"></span>
                        Role
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userData.userType}
                        disabled={true}
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        Email
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userData.email}
                        disabled={true}
                      />
                    </td>
                  </tr>
                  {regularUser ? (
                    <tr className="edit-info">
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
                    <tr className="edit-info">
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Subscribe Status
                        </strong>
                      </td>
                      <td className="text-primary">
                        <button
                          className="btn btn-link"
                          onClick={() => cancelSubscription()}
                        >
                          Click here to Unsubscribe
                        </button>
                      </td>
                    </tr>
                  ) : null}
                  {admin ? (
                    <tr className="edit-info">
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Subscribe Status
                        </strong>
                      </td>
                      <td className="text-primary">Owner</td>
                    </tr>
                  ) : null}
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        Old Password
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="•••••••••••••••••••"
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        New Password
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="•••••••••••••••••••"
                      />
                    </td>
                  </tr>
                  <tr className="edit-info">
                    <td>
                      <strong>
                        <span className="glyphicon glyphicon-envelope text-primary"></span>
                        Confirm Password
                      </strong>
                    </td>
                    <td className="text-primary">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="•••••••••••••••••••"
                      />
                    </td>
                  </tr>
                  <button className="btn btn-primary submit" type="submit">
                    Update Profile
                  </button>
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

//folow this for update user info: https://stackoverflow.com/questions/65062187/need-to-have-the-user-be-able-to-edit-profile-with-an-edit-button
