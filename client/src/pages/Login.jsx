import { useState, React, useContext } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContentProvider";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setIsLogin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message || "an error getUserData");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message || "an error getUserData");
        }
      }
    } catch (error) {
      toast.error(error.message || "an error getUserData");
    }
  };

  return (
    <div className="h-screen w-full bg-pink-50 flex items-center justify-center">
      <div className="absolute top-0 left-0 p-10 ">
        <h1
          className="hover:text-amber-700 text-2xl font-bold text-amber-800 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          LOGO
        </h1>
      </div>
      <div className=" w-fit p-10 rounded-md  h-fit drop-shadow-lg bg-red-400 flex flex-col items-center  ">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-50">
            {state === "Sign up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-300 text-md">
            {state === "Sign up"
              ? "Create your Account"
              : "Login to your Account"}
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col   gap-4 w-96">
            {state === "Sign up" ? (
              <div className="bg-blue-100 rounded-md ">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className=" bg-transparent outline-none border-gray-300 p-4  text-black w-full"
                />
              </div>
            ) : (
              <></>
            )}

            <div className="bg-blue-100 rounded-md">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" bg-transparent outline-none border-gray-300 p-4  text-black w-full"
              />
            </div>
            <div className="bg-blue-100 rounded-md">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" bg-transparent outline-none border-gray-300 p-4  text-black w-full"
              />
            </div>
            <div>
              <p
                className="text-amber-50 mb-4 cursor-pointer hover:text-amber-100"
                onClick={() => navigate("/reset-password")}
              >
                Forgot password?
              </p>
            </div>

            <button className="bg-amber-700 p-4 hover:bg-amber-600 rounded-md text-amber-50 font-bold text-xl">
              {state === "Sign up" ? "Sign up" : "Login"}
            </button>
          </div>
        </form>
        <div>
          {state === "Sign up" ? (
            <p className="text-amber-50 mt-4 cursor-pointer hover:text-amber-100">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-amber-50 mt-4 cursor-pointer hover:text-amber-100">
              Don't have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setState("Sign up")}
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
