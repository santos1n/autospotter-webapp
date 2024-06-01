import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import car from "../assets/park/car.png";

const ParkingModule = ({ userId }) => {
  const [parkingStatus, setParkingStatus] = useState(Array(8).fill(0));
  const navigate = useNavigate();

  const fetchParkingStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8001/sensors");
      const sensorData = response.data;

      // Assuming sensorData is an array of sensor status
      const updatedStatus = sensorData.map((data) => data.sensorstatus);
      setParkingStatus(updatedStatus);
    } catch (error) {
      console.error("Error fetching sensor status:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchParkingStatus, 5000); // Fetch every 5 seconds

    // Fetch parking status on initial component mount
    fetchParkingStatus();

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleParkingSpotClick = (index) => {
    if (parkingStatus[index] === 0) {
      navigate(`/ticket/create/${index + 1}`); // Pass spotId as part of the URL
    }
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-2 w-full gap-x-8 mb-8">
        {parkingStatus.map((status, index) => (
          <div
            key={index}
            className={`h-16 w-32 flex items-center justify-center ${
              index % 2 !== 0 ? "scale-x-[-1]" : "scale-x-1"
            } ${
              status === 1
                ? "bg-gray-200 border-2 border-r-0 border-l border-black"
                : "bg-green-400"
            }`}
            onClick={() => handleParkingSpotClick(index)}
            style={{
              backgroundImage: status === 1 ? `url('${car}')` : "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          >
            {status === 1 ? null : (
              <span
                className={`${
                  index % 2 !== 0 ? "scale-x-[-1]" : "scale-x-1"
                } transform transition-transform duration-300`}
              >{`Park00${index + 1}`}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingModule;
