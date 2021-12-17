import { useState } from "react";

const AuthScreen = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please add a username");
      return;
    }

    if (!password) {
      alert("Please add a password");
      return;
    }

    login();

    setUsername("");
    setPassword("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login / Register" className="btn btn-block" />
    </form>
  );
};

export default AuthScreen;
