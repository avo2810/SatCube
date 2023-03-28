import React, { Component } from "react";
import logo from "../Images/satcube_logo.jpeg";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("http://localhost:4000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./dashboard";
        }
      });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="logo-wrapper">
          <img className="logo" src={logo} />
        </div>
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Don't have an account? <a href="/sign-up">Create account!</a>
            </p>
            <br />
            <h6 className="forgot-password-text">
              Forgot Password? <a href="/forgot-password">Reset Here!</a>
            </h6>
          </form>
        </div>
      </div>
    );
  }
}
