import { Routes, Route } from "react-router-dom";

import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Home from "../views/Home";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login user={props.user} setUser={props.setUser} />} />
      <Route path="signup" element={<SignUp user={props.user} />} />
    </Routes>
  );
};

export default AppRoutes;
