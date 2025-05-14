import { React, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";

function Home() {
  const { userData, getUserData } = useContext(AppContent);
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";
  // const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    getUserData();
  }, []);
  console.log("userData:", userData);
  console.log("profilePic:", userData?.profilePic);
  return (
    <div className="h-full w-full bg-blue-300">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <div className="p-4 mb-4">
            <img
              src={userData?.profilePic ? userData.profilePic : defaultImage}
              alt="Profile"
              className="w-96 h-96 rounded-full object-cover border-4 border-amber-950"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>

          <h1 className="text-4xl font-bold text-amber-950  text-center">
            HEY {userData ? userData.name : "Developer"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
