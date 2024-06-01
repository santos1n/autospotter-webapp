import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Park from "./pages/Park";
import Ticket from "./pages/Ticket";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import TicketDetails from "./components/TicketDetails";
import TicketForm from "./components/TicketForm";

function App() {
  const [userId, setUserId] = useState(null); // Ensure consistent user data

  console.log("UserId in App:", userId);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Auth setUser={setUserId} />} />
        <Route path="/signup" element={<Auth setUser={setUserId} />} />
        <Route path="/landing" element={<Landing userId={userId} />} />
        <Route path="/park" element={<Park userId={userId} />} />
        <Route path="/ticket" element={<Ticket userId={userId} />} />
        <Route path="/ticket/create" element={<TicketForm userId={userId} />} />
        <Route
          path="/ticket/create/:spotId" // Define a parameter for spotId
          element={<TicketForm userId={userId} />}
        />
        <Route path="/ticket/details" element={<TicketDetails />} />
        <Route path="/profile" element={<Profile userId={userId} />} />
        <Route path="/" element={<Auth setUser={setUserId} />} />
      </Routes>
    </Router>
  );
}

export default App;
