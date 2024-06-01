import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";

const Ticket = ({ userId }) => {
  const handleTicketSubmission = (formData) => {
    // Here, you can handle the submission logic if needed or update state accordingly
    console.log("Form data submitted:", formData);
    // You might use this to send data to the server or handle it as required
  };

  return (
    <div>
      {/* Assuming ticketCreated state is managed elsewhere */}
      {ticketCreated ? (
        <TicketDetails /> // Display ticket details if ticket is created
      ) : (
        <TicketForm onSubmit={handleTicketSubmission} />
      )}
    </div>
  );
};

export default Ticket;
