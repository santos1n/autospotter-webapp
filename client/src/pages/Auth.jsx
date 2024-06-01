import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = ({ setUser }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView((prevView) => !prevView);
  };

  return (
    <>
      {isLoginView ? (
        <Login setUser={setUser} toggleView={toggleView} />
      ) : (
        <Signup setUser={setUser} toggleView={toggleView} />
      )}
    </>
  );
};

export default Auth;
