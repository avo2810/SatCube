import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Signin from "./screens/Signin";
import SignUp from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import UserInfo from "./screens/UserInfo";
import ResetPassword from "./screens/ResetPassword";
import UserLists from "./screens/UserLists";
import DashboardRoot from "./screens/DashboardRoot";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            // This one is to verrify if the user is successfully logged in,
            // if so, we can just show the dashboard, if not, show the sign-in page
            element={isLoggedIn ? <DashboardRoot /> : <Signin />}
          >
          
            <Route path="/" element={<Dashboard />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/user-lists" element={<UserLists />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          <Route path="/forgot-password" element={<ResetPassword />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
