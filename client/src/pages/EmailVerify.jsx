import { React, useContext, useEffect, useRef } from "react";
import { AppContent } from "../context/AppContentProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import BackToHome from "../components/BackToHome";

const EmailVerify = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserData, isLogin, userData } = useContext(AppContent);
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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(backendUrl + "/api/auth/verify-email", {
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLogin && userData && userData.isAccountVerified && navigate("/");
  }, [isLogin, userData, navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-500">
      <BackToHome />
      <form onSubmit={onSubmitHandler}>
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
              Verify email
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailVerify;
