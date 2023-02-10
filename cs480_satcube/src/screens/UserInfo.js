import React, { Component } from "react";
import "./UserInfo.css";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
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
        this.setState({ userData: data.data });
      });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ width: "auto" }}>
          <h1>Account Information</h1>
          <h3>First Name: {this.state.userData.firstName}</h3>
          <h3>Last Name: {this.state.userData.lastName}</h3>
          <h3>UserType: {this.state.userData.userType}</h3>
        </div>
      </div>
    );
  }
}
