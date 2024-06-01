import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, toggleView }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        history("/landing");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = (e) => {
    if (!e.target.value) {
      setEmailFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = (e) => {
    if (!e.target.value) {
      setPasswordFocused(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="bg-blue-600 w-full h-[40vh] pl-10 pt-32 flex lg:items-center lg:pt-0 lg:pl-32">
        <h1 className="text-white font-bold text-5xl">
          Welcome <br />
          Back
        </h1>
      </div>
      <div className="bg-white w-full h-[50vh] flex flex-col justify-center items-center">
        <form className="w-full max-w-md px-10 lg:px-0" onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col relative ">
            <label
              htmlFor="email"
              className={`${
                emailFocused ? "text-blue-500 -translate-y-4 text-sm" : ""
              } transition-transform transform-gpu duration-300 absolute px-3`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=" "
              required
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              onChange={handleChange}
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1"
            />
          </div>
          <div className="mb-6 flex flex-col relative">
            <label
              htmlFor="password"
              className={`${
                passwordFocused ? "text-blue-500 -translate-y-4 text-sm" : ""
              } transition-transform transform-gpu duration-300 absolute px-3`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder=" "
              required
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              onChange={handleChange}
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1 mb-12"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full h-12 rounded mb-10"
          >
            Log in
          </button>
          <button
            type="button"
            className="o border-solid border-black border-2 w-full h-12 rounded"
            onClick={toggleView}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
