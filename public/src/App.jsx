import Tasks from "./components/tasks/Tasks.jsx";
import AuthScreen from "./components/auth/AuthScreen.jsx";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(false);

  const login = () => {
    setUser(!user);
  };

  return (
    <div className="container">
      {user ? <Tasks /> : <AuthScreen login={login} />}
    </div>
  );
}

export default App;
