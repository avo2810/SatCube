import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signin from "./screens/Signin";
import SignUp from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import UserInfo from "./screens/UserInfo";
import ResetPassword from "./screens/ResetPassword";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                exact
                path="/"
                // This one is to verrify if the user is successfully logged in,
                // if so, we can just show the dashboard, if not, show the sign-in page
                element={isLoggedIn ? <Dashboard /> : <Signin />}
              />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/userInfo" element={<UserInfo />} />
              <Route path="/forgot-password" element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
