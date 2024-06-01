import axios from "axios";
import React, { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails";
import { useNavigate } from "react-router-dom";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    ticketname: "",
    ticketemail: "",
    ticketcontact: "",
    ticketvehicle: "",
    ticketspot: "",
  });

  const [ticketId, setTicketId] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userName = formData.ticketname;

      const userResponse = await axios.get(
        `http://localhost:8001/users?username=${userName}`
      );

      if (userResponse.data.length > 0) {
        const userId = userResponse.data[0].id;

        const ticketResponse = await fetch(
          "http://localhost:8001/tickets/create-ticket",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, userId }),
          }
        );

        if (ticketResponse.status === 201) {
          const newTicket = await ticketResponse.json();
          console.log("New ticket created:", newTicket);

          setTicketId(newTicket.id);

          navigate("/ticket/details", {
            state: {
              ticketId: newTicket.id,
              parkingSpot: formData.ticketspot,
              contact: formData.ticketcontact,
              name: formData.ticketname,
              vehicle: formData.ticketvehicle,
            },
          });
        } else {
          console.error("Failed to create ticket");
        }
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (ticketId) {
    return (
      <TicketDetails
        ticketname={ticketname}
        parkingSpot={formData.ticketspot}
        contact={formData.ticketcontact}
        email={formData.ticketemail}
        vehicle={formData.ticketvehicle}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center px-12 w-full h-[40vh] lg:h-[30vh]">
        <h1 className="font-bold text-5xl mb-12 lg:mx-auto lg:text-center">
          Create Your <br />
          Ticket
        </h1>
        <p className="mx-auto">
          Create your ticket where until you come back or until given duration
          of your time. Make sure you have your Payment Method set.
        </p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="ticketname">Name:</label>
          <input
            type="text"
            id="ticketname"
            name="ticketname"
            onChange={handleChange}
            className="px-4 py-2 border-2 border-solid border-black block mb-2"
          />
        </div>
        <div>
          <label htmlFor="ticketspot">Parking Spot:</label>
          <input
            type="text"
            id="ticketspot"
            name="ticketspot"
            onChange={handleChange}
            className="px-4 py-2 border-2 border-solid border-black block mb-2"
          />
        </div>
        <div>
          <label htmlFor="ticketemail">Email:</label>
          <input
            type="text"
            id="ticketemail"
            name="ticketemail"
            onChange={handleChange}
            className="px-4 py-2 border-2 border-solid border-black block mb-2"
          />
        </div>
        <div>
          <label htmlFor="ticketcontact">Contact:</label>
          <input
            type="text"
            id="ticketcontact"
            name="ticketcontact"
            onChange={handleChange}
            className="px-4 py-2 border-2 border-solid border-black block mb-2"
          />
        </div>
        <div>
          <label htmlFor="ticketvehicle">Vehicle:</label>
          <input
            type="text"
            id="ticketvehicle"
            name="ticketvehicle"
            onChange={handleChange}
            className="px-4 py-2 border-2 border-solid border-black block mb-8"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full h-12 rounded mb-10"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
