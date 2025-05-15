import { React, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";
import { useNavigate } from "react-router";
function Home() {
  const { userData, getUserData, isLogin } = useContext(AppContent);
  const navigate = useNavigate();
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";
  // const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    isLogin && getUserData();
  }, []);

  return (
    <div className="h-full w-full bg-blue-300">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className=" ">
          <div className="p-4 mb-4 relative group">
            {isLogin && (
              <div
                className="cursor-pointer  opacity-0 transition-opacity duration-300  group-hover:opacity-60 rounded-full flex  justify-center items-center bg-amber-50 w-96 h-96 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                onClick={() => navigate("/profile")}
              >
                <h1 className="font-bold text-amber-950 text-2xl ">
                  Click to change profile picture
                </h1>
              </div>
            )}
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
