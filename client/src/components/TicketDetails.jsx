import React, { useEffect, useState } from "react";
import axios from "axios";
import qr from "../assets/ticket/qr.png";
import caryellow from "../assets/ticket/yellow-sport-car-icon-automobile-side-view-isolated-white-background_543062-732-removebg-preview.png";

const TicketDetails = () => {
  const [latestTicket, setLatestTicket] = useState(null);

  useEffect(() => {
    const fetchLatestTicket = async () => {
      try {
        const latestTicketResponse = await axios.get(
          "http://localhost:8001/tickets/newticket"
        );
        setLatestTicket(latestTicketResponse.data.lastTicket);
      } catch (error) {
        console.error("Error fetching latest ticket:", error);
      }
    };

    fetchLatestTicket();
  }, []);

  return (
    <div className="w-full h-full p-12 pt-24">
      {latestTicket && (
        <>
          <div className="h-full w-full rounded-xl border-2 border-solid border-black px-12 py-8 mb-2 relative">
            <img
              src={caryellow}
              alt=""
              className="absolute -top-20 left-1/2 right-1/2 -translate-x-1/2"
            />
            <h2 className="text-center border-b-2 border-black mb-2 pb-2">
              Reserved Successfully
            </h2>
            <div>
              <div className="flex justify-between">
                <h4>Parking Spot:</h4>
                <p>{latestTicket.ticketspot}</p>
              </div>
              <div className="flex justify-between">
                <h4>Payment:</h4>
                <p>P 250</p>
              </div>
            </div>
          </div>
          <div className="h-full w-full rounded-xl border-2 border-solid border-black px-12 py-8 mb-2">
            <h2 className="text-center">Ticket Id: {latestTicket.ticketid}</h2>
            <img src={qr} alt="qr" />
            <p>Scan for Payment transaction</p>
          </div>
          <div className="h-full w-full rounded-xl border-2 border-solid border-black px-12 py-8">
            <h2 className="text-center">Ticket Details</h2>
            <p>
              Parking Spot# {latestTicket.ticketspot}, Contact #:
              {latestTicket.ticketcontact}, Name:
              {latestTicket.ticketname}, Vehicle:
              {latestTicket.ticketvehicle}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketDetails;
