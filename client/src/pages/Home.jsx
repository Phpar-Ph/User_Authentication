import { React, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";
import { useNavigate } from "react-router";

function Home() {
  const { userData, getUserData, isLogin } = useContext(AppContent);
  const navigate = useNavigate();
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";

  useEffect(() => {
    isLogin && getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Profile Container */}
          <div className="relative group mb-8">
            <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-amber-600">
              <img
                src={userData?.profilePic || defaultImage}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              {isLogin && (
                <div
                  onClick={() => navigate("/profile")}
                  className="absolute inset-0 bg-amber-800/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <p className="text-white text-xl font-bold px-6 py-3 rounded-full bg-amber-700/70 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Change Picture
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-amber-900 mb-2">
              Welcome{isLogin ? "," : ""}
            </h1>
            <h2 className="text-4xl font-bold text-amber-700">
              {userData?.name || "Developer"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
