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
    <div className="h-20 w-full bg-red-400">
      <div className="flex justify-between items-center h-full px-40 text-2xl font-bold text-amber-50">
        <div>
          <h1 className="hover:text-amber-200">
            <NavLink to="/">LOGO</NavLink>
          </h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-10 ">
            {userData ? (
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-amber-50 relative group">
                {userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black  pt-10 font-medium w-40">
                  <ul className="list-none m-0 p-2 bg-gray-100 text-sm rounded">
                    {!userData.isAccountVerified && (
                      <li
                        className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                        onClick={sendVerificationOtp}
                      >
                        Verify mail
                      </li>
                    )}
                    <li
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                      onClick={profile}
                    >
                      Profile
                    </li>
                    <li
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <li className="hover:text-amber-200">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
