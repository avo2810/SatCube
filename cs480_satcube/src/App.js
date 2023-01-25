import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signin from "./screens/Signin";
import SignUp from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import UserInfo from "./screens/UserInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Signin />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/userInfo" element={<UserInfo />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
