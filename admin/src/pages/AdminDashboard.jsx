import React, { useState, useEffect } from "react";
import axios from "axios";
import car from "../assets/car.png";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDataResponse = await axios.get(
          "http://localhost:8001/admin/admin-data"
        );
        setAdminData(adminDataResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let occupiedSpots = 0;
  let availableSpots = 0;

  if (adminData && adminData.sensorData) {
    adminData.sensorData.forEach((sensor) => {
      if (sensor.sensorstatus === 0) {
        availableSpots++;
      } else if (sensor.sensorstatus === 1) {
        occupiedSpots++;
      }
    });
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8001/admin/users/${userId}`);
      // Refresh data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-[whitesmoke] p-6">
      <h2 className="text-3xl font-bold my-12 text-center">
        AutoSpotter Dashboard
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : adminData ? (
        <div className="flex justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 w-[50vw]">
              <div className="flex justify-between">
                <h3 className="bg-white rounded-lg w-fit shadow-lg px-8 py-4">
                  User Count: <p>{adminData.userCount}</p>
                </h3>
                <h3 className="bg-white rounded-lg w-fit shadow-lg px-8 py-4">
                  Occupied Spot Count: <p>{occupiedSpots}</p>
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="bg-white rounded-lg w-fit shadow-lg px-8 py-4">
                  Ticket Count: <p>{adminData.ticketCount}</p>
                </h3>
                <h3 className="bg-white rounded-lg w-fit shadow-lg px-8 py-4">
                  Available Spot Count: <p>{availableSpots}</p>
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-lg w-[50vw] drop-shadow-lg flex justify-center items-center flex-col pb-8 pt-2">
              <h3 className="text-xl font-semibold mt-6 mb-4">Users Table</h3>
              <table>
                <thead>
                  <tr className="shadow-md border-solid border-slate-700 border-b-[1px]">
                    <th className="p-3">Image</th>
                    <th className="p-3">ID</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Vehicle</th>
                    <th className="p-3">CreatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.users.map((user) => (
                    <tr
                      className="border-solid border-slate-600 border-b-[1px] even:bg-slate-100"
                      key={user.id}
                    >
                      <td className="p-3">
                        {user.image ? (
                          <img
                            src={`http://localhost:8001/${user.image}`}
                            alt={`User ${user.username}`}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.contact}</td>
                      <td className="p-3">{user.vehicle}</td>
                      <td className="p-3">{user.createdAt}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-blue-500 text-white rounded-lg px-4 py-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg w-[50vw] drop-shadow-lg flex justify-center items-center flex-col pb-8 pt-2">
              <h3 className="text-xl font-semibold mt-6 mb-4">
                Parking Display
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-32 w-full px-24">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className={`h-16 flex items-center justify-center ${
                      index % 2 !== 0 ? "scale-x-[-1]" : "scale-x-1"
                    } ${
                      adminData &&
                      adminData.sensorData &&
                      adminData.sensorData[index]?.sensorstatus === 1
                        ? "bg-gray-200 border-2 border-r-0 border-l border-black"
                        : "bg-green-400 "
                    }`}
                    onClick={() => console.log(`Parking Spot ${index + 1}`)}
                    style={{
                      backgroundImage:
                        adminData &&
                        adminData.sensorData &&
                        adminData.sensorData[index]?.sensorstatus === 1
                          ? `url('${car}')`
                          : "none",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <span
                      className={`${
                        index % 2 !== 0 ? "scale-x-[-1]" : "scale-x-1"
                      } transform transition-transform duration-300`}
                    >{`Park00${index + 1}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-lg w-[40vw] drop-shadow-lg flex justify-center items-center flex-col pb-8 pt-2">
              <h3 className="text-xl font-semibold mt-6 mb-4">
                Sensor Data Table
              </h3>
              <table>
                <thead>
                  <tr className="shadow-md border-solid border-slate-700 border-b-[1px]">
                    <th className="p-3">Data ID</th>
                    <th className="p-3">Sensor ID</th>
                    <th className="p-3">Sensor Name</th>
                    <th className="p-3">Sensor Status</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.sensorData.map((sensor) => (
                    <tr
                      className="border-solid border-slate-600 border-b-[1px] even:bg-slate-100"
                      key={sensor.dataid}
                    >
                      <td className="p-3">{sensor.dataid}</td>
                      <td className="p-3">{sensor.sensorid}</td>
                      <td className="p-3">{sensor.SensorList.sensorname}</td>
                      <td className="p-3">{sensor.sensorstatus}</td>
                      <td className="p-3">{sensor.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg w-[40vw] drop-shadow-lg flex justify-center items-center flex-col pb-8 pt-2">
              <h3 className="text-xl font-semibold mt-6 mb-4">Tickets Table</h3>
              <table>
                <thead>
                  <tr className="shadow-md border-solid border-slate-700 border-b-[1px]">
                    <th className="p-3">Ticket ID</th>
                    <th className="p-3">Ticket Name</th>
                    <th className="p-3">Ticket Spot</th>
                    <th className="p-3">Ticket Contact</th>
                    <th className="p-3">Ticket Email</th>
                    <th className="p-3">Ticket Vehicle</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.tickets.map((ticket) => (
                    <tr
                      className="border-solid border-slate-600 border-b-[1px] even:bg-slate-100"
                      key={ticket.ticketid}
                    >
                      <td className="p-3">{ticket.ticketid}</td>
                      <td className="p-3">{ticket.ticketname}</td>
                      <td className="p-3">{ticket.ticketspot}</td>
                      <td className="p-3">{ticket.ticketcontact}</td>
                      <td className="p-3">{ticket.ticketemail}</td>
                      <td className="p-3">{ticket.ticketvehicle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
