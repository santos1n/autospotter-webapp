import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ParkingModule from "../components/ParkingModule";

const Park = ({ userId, spotsData }) => {
  const navigate = useNavigate();

  const handleSpotClick = (spotId) => {
    const spot = spotsData.find((spot) => spot.id === spotId);
    if (spot && spot.status === 0) {
      navigate(`/ticket/create/${spotId}`); // Pass spotId as part of the URL
    } else {
      console.log("Spot is occupied or unavailable.");
    }
  };

  return (
    <div className="w-full h-[105vh] flex flex-col items-center">
      <div className="flex flex-col py-12 px-12 w-full h-[40vh] lg:h-[30vh]">
        <h1 className="font-bold text-5xl mb-12 lg:mx-auto lg:text-center">
          Parking Spaces
        </h1>
        <p className="mx-auto">
          Head to an available parking spot, then click on the spot where you
          want to park. Lastly, add details for the ticket.
        </p>
      </div>
      <ParkingModule spotsData={spotsData} handleSpotClick={handleSpotClick} />
      <Link
        to="/ticket/create"
        className="flex items-center justify-center rounded w-72 h-12 text-white bg-[#006BFF] text-center mx-auto"
      >
        Confirm Parking Spot
      </Link>
    </div>
  );
};

export default Park;
