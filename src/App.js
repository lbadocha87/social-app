import "./App.css";

import { useState } from "react";

import AppNav from "./components/AppNav";
import AppRoutes from "./routes/AppRoutes";

import axios from "axios";

function App() {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "");
  axios.defaults.headers.post['Content-Type'] = 'application/json';


  return (
    <div className="App">
      <AppNav user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
