import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [usersProfile, setUsersProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileResponse = await axios.get(
          "http://localhost:8001/profile"
        );
        setUsersProfile(userProfileResponse.data.userProfile);
      } catch (error) {
        console.error("Error fetching Last User:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-full h-[90vh] flex justify-center items-center px-12">
      {usersProfile && (
        <>
          <div className="w-full h-[50vh] border-4 border-solid border-[#006BFF] rounded-lg relative inner-bor">
            <img
              src={`http://localhost:8001/${usersProfile.image}`}
              alt={`User ${usersProfile.username}`}
              className="w-32 h-32 object-cover rounded-full object-center absolute -top-[15%] left-1/2 right-1/2 -translate-x-[55%]"
              style={{
                border: "5px solid #002B66",
              }}
            />
            <div className="bg-blue-600 border-solid text-white border-[#006BFF] m-0  w-[101%] -ml-[1px] flex flex-col gap-y-4 px-4 pt-16 pb-12">
              <div className="flex justify-between gap-x-12">
                <div className="w-full">
                  <h3>Name:</h3>
                  <p className="mt-2 pb-1 border-b-[1px] border-solid border-white">
                    {usersProfile.username}
                  </p>
                </div>
                <div className="w-full">
                  <h3>Contact:</h3>
                  <p className="mt-2 pb-1 border-b-[1px] border-solid border-white">
                    {usersProfile.contact}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-x-12">
                <div className="w-full">
                  <h3>Email</h3>
                  <p className="mt-2 pb-1 border-b-[1px] border-solid border-white">
                    {usersProfile.email}
                  </p>
                </div>
                <div className="w-full">
                  <h3>Vehicle:</h3>
                  <p className="mt-2 pb-1 border-b-[1px] border-solid border-white">
                    {usersProfile.vehicle}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-1/2 px-8">
              <button
                type="button"
                className="bg-[#006BFF] text-white w-full h-12 rounded mb-10"
              >
                Connect To GCash
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
