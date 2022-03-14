import "./SignUp.css";

import { useState } from "react";

const SignUp = () => {
  const [formData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(target.value);

    setFromData({
      ...formData,
      [name]: target.value,
    });
  };

  return (
    <div className="signUp">
      <form action="">
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
        />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          onChange={handleInputChange}
        />
        <button className="btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
