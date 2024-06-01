import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const Landing = ({ userId }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center h-[50vh] px-8">
        <h1 className="font-bold text-5xl mb-12 lg:mx-auto lg:text-center">
          Find Your
          <br /> Parking Spot
        </h1>
        <Link
          to="/park"
          className="flex items-center justify-center rounded w-72 h-12 text-white bg-[#006BFF] text-center mx-auto"
        >
          Parking Spaces
        </Link>
      </div>
      <div className="flex flex-col items-center justify-end h-[40vh] pb-32 gap-4">
        <p>Check your Profile here</p>
        <Link
          to="/profile"
          className="flex items-center justify-center rounded w-72 h-12 border-solid border-2 border-black text-center mx-auto"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Landing;
