import { React, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AppContent } from "../context/AppContentProvider";
import axios from "axios";
import { toast } from "react-toastify";
function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLogin } =
    useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLogin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const profile = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white hover:text-amber-200 transition-colors">
                AUTHENTICATION
              </span>
            </NavLink>
          </div>

          <div className="flex items-center">
            {userData ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 focus:outline-none">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-800 text-white text-xl font-semibold transition-transform group-hover:scale-105">
                    {userData.name[0].toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.email}</p>
                  </div>

                  {!userData.isAccountVerified && (
                    <button
                      onClick={() => {
                        sendVerificationOtp();
                        navigate("/email-verify");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                    >
                      <span className="text-xs">📧</span> Verify Email
                    </button>
                  )}

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center gap-2"
                  >
                    <span className="text-xs">👤</span> Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <span className="text-xs">🚪</span> Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white hover:text-amber-200 px-4 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
