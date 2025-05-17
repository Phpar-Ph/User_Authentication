import { React, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContentProvider";
import axios from "axios";
import { toast } from "react-toastify";
import BackToHome from "../components/BackToHome";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-500">
      <BackToHome />
      {/* Enter email address */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail}>
          <div className="w-fit h-fit p-10 rounded-md bg-amber-400 flex flex-col justify-center items-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                Enter your registered email address:
              </h1>
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" w-full p-4 bg-amber-200 text-amber-950  text-xl rounded-md "
              />
            </div>
            <div className="pt-10 pb-0 mb-0">
              <button className="text-2xl bg-amber-600 hover:bg-amber-700 text-amber-50 font-bold p-3 rounded-md hover:cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp}>
          <div className="w-fit h-fit p-10 rounded-md bg-amber-400 flex flex-col justify-center items-center">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Enter 6 digits OTP: </h1>
            </div>
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-12 h-12 bg-amber-200 text-amber-950 text-center text-xl rounded-md "
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <div className="pt-10 pb-0 mb-0">
              <button className="text-2xl bg-amber-600 hover:bg-amber-700 text-amber-50 font-bold p-3 rounded-md hover:cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Enter new Password */}
      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword}>
          <div className="w-fit h-fit p-10 rounded-md bg-amber-400 flex flex-col justify-center items-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Enter your new password:</h1>
            </div>
            <div className="w-full">
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className=" w-full p-4 bg-amber-200 text-amber-950  text-xl rounded-md "
              />
            </div>
            <div className="pt-10 pb-0 mb-0">
              <button className="text-2xl bg-amber-600 hover:bg-amber-700 text-amber-50 font-bold p-3 rounded-md hover:cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {/* ENter OTP */}
    </div>
  );
}

export default ResetPassword;
