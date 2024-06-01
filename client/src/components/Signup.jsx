import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser, toggleView }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    vehicle: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("vehicle", formData.vehicle);
      formDataToSend.append("image", formData.image); // Ensure the image data is correctly appended

      const response = await fetch("http://localhost:8001/users/signup", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newUser = await response.json();
        setUser(newUser);
        history("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [contactFocused, setContactFocused] = useState(false);
  const [vehicleFocused, setVehicleFocused] = useState(false);
  const [imageFocused, setImageFocused] = useState(false);

  const handleImageFocus = () => {
    setImageFocused(true);
  };

  const handleImageBlur = (e) => {
    if (!e.target.value) {
      setImageFocused(false);
    }
  };

  const handleContactFocus = () => {
    setContactFocused(true);
  };

  const handleContactBlur = (e) => {
    if (!e.target.value) {
      setContactFocused(false);
    }
  };

  const handleVehicleFocus = () => {
    setVehicleFocused(true);
  };

  const handleVehicleBlur = (e) => {
    if (!e.target.value) {
      setVehicleFocused(false);
    }
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = (e) => {
    if (!e.target.value) {
      setEmailFocused(false);
    }
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = (e) => {
    if (!e.target.value) {
      setUsernameFocused(false);
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
    <div className="h-[115vh] w-full">
      <div className="bg-blue-600 w-full h-[40vh] pl-10 pt-32 flex lg:items-center lg:pt-0 lg:pl-32">
        <h1 className="text-white font-bold text-5xl">
          Create <br /> Account
        </h1>
      </div>
      <div className="bg-white w-full h-[50vh] pt-32 flex flex-col justify-center items-center">
        <form className="w-full max-w-md px-10 lg:px-0" onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col relative ">
            <label
              htmlFor="username"
              className={`${
                usernameFocused ? "text-blue-500 -translate-y-4 text-sm" : ""
              } transition-transform transform-gpu duration-300 absolute px-3`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder=" "
              required
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              onChange={handleChange}
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1"
            />
          </div>
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
          <div className="mb-6 flex flex-col relative ">
            <label
              htmlFor="contact"
              className={`${
                contactFocused ? "text-blue-500 -translate-y-4 text-sm" : ""
              } transition-transform transform-gpu duration-300 absolute px-3`}
            >
              Contact
            </label>
            <input
              id="contact"
              type="text"
              placeholder=" "
              required
              onFocus={handleContactFocus}
              onBlur={handleContactBlur}
              onChange={handleChange}
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1"
            />
          </div>
          <div className="mb-6 flex flex-col relative ">
            <label
              htmlFor="vehicle"
              className={`${
                vehicleFocused ? "text-blue-500 -translate-y-4 text-sm" : ""
              } transition-transform transform-gpu duration-300 absolute px-3`}
            >
              Vehicle
            </label>
            <input
              id="vehicle"
              type="text"
              placeholder=" "
              required
              onFocus={handleVehicleFocus}
              onBlur={handleVehicleBlur}
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
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1"
            />
          </div>
          <div className="mb-6 flex flex-col relative">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-border duration-300 px-3 py-1 mb-12"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full h-12 rounded mb-10"
          >
            Sign up
          </button>
          <button
            type="button"
            className="o border-solid border-black border-2 w-full h-12 rounded"
            onClick={toggleView}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
