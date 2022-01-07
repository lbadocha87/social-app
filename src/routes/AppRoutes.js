import { Routes, Route } from "react-router-dom";

import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Home from "../views/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
