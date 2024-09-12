import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = () => {
  const initialProfileImage =
    "https://bootdey.com/img/Content/avatar/avatar7.png";
  const [userData, setUserData] = useState("");
  const [regularUser, setRegularUser] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileUploadImage, setProfileUploadImage] = useState("");

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
        setUserData(data.data);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        if (data.data.profileImage) {
          setProfileUploadImage(data.data.profileImage.url);
        }
        console.log(data.data.userType);

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

  if (!profileUploadImage) {
    setProfileUploadImage(initialProfileImage);
  }

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileUploadImage(reader.result);
      };
    } else {
      setProfileUploadImage("");
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName) {
      setFirstName(userData.firstName);
    }
    if (!lastName) {
      setLastName(userData.lastName);
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match. Please enter again!");
    } else {
      axios
        .post("http://localhost:8080/edit-profile", {
          email: userData.email,
          firstName,
          lastName,
          newPassword,
          profileUploadImage,
        })
        .then((res) => {
          alert("Successfully update profile information.");
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  };

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
              src={profileUploadImage}
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
    <form onSubmit={handleSubmit}>
      <div className="container bootstrap snippets bootdey ">
        <div className="panel-body inf-content ">
          <div className="row">
            <div className="col-md-4 img">
              <img
                alt=""
                style={{ width: 500, borderRadius: "50%" }}
                title=""
                className="img-circle img-thumbnail isTooltip"
                src={profileUploadImage}
              />
              {/* <!-- Profile picture help block--> */}
              {/* <div className="small font-italic text-muted mb-3 image">
                JPG or PNG no larger than 5 MB
              </div> */}
              <div className="image-button">
                <input
                  type="file"
                  accept="image/"
                  onChange={handleProfileImageUpload}
                />
              </div>
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
                          placeholder={userData._id}
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
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
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
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
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
                          New Password
                        </strong>
                      </td>
                      <td className="text-primary">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="•••••••••••••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
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
                          type="password"
                          className="form-control"
                          placeholder="•••••••••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </td>
                    </tr>
                    <button className="btn btn-primary submit" type="submit">
                      Update Profile
                    </button>
                    <button
                      className="btn btn-primary cancel"
                      type="button"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UserInfo;
//use this to fix the style: https://www.bootdey.com/snippets/view/Table-user-information

//folow this for update user info: https://stackoverflow.com/questions/65062187/need-to-have-the-user-be-able-to-edit-profile-with-an-edit-button
