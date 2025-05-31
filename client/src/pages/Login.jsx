import { React, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContentProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { userViewStore } from "../store/userStore";
import { userAuth } from "../api/userApi";
const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const { view, setView } = userViewStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },

    resolver: zodResolver(formSchema),
  });
  // const { backendUrl, setIsLogin, getUserData } = useContext(AppContent);
  const queryClient = useQueryClient();

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["userAuth"],
  //   queryFn: userAuth,
  //   onSuccess: () => {
  //     navigate("/");
  //   },
  // });

  const { mutate } = useMutation({
    mutationFn: userAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAuth"] }), navigate("/");
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    mutate({ data: formData });
  };
  useEffect(() => {
    reset();
  }, [view, reset]);
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
            {view === "Sign up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-300 text-md">
            {view === "Sign up"
              ? "Create your Account"
              : "Login to your Account"}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col   gap-4 w-96">
            {view === "Sign up" ? (
              <div>
                <label>
                  Full Name
                  <input
                    {...register("fullName")}
                    placeholder="Enter your full name..."
                    className="  outline-none rounded-md  bg-blue-100 border-gray-300 p-4  text-black w-full"
                  />
                </label>
                <p>{errors.fullName?.message}</p>
              </div>
            ) : (
              <></>
            )}

            <div>
              <label htmlFor="">
                Email
                <input
                  {...register("email")}
                  placeholder="Enter your email..."
                  className=" bg-blue-100 rounded-md outline-none border-gray-300 p-4  text-black w-full"
                />
              </label>
              <p>{errors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="">
                Password
                <input
                  {...register("password")}
                  placeholder="Enter your password..."
                  className=" bg-blue-100 rounded-md outline-none border-gray-300 p-4  text-black w-full"
                />
              </label>
              <p>{errors.password?.message}</p>
            </div>

            {errors.email && <p role="alert">{errors.email?.message}</p>}
            <div>
              <p
                className="text-amber-50 mb-4 cursor-pointer hover:text-amber-100"
                onClick={() => navigate("/reset-password")}
              >
                Forgot password?
              </p>
            </div>

            <button className="bg-amber-700 p-4 hover:bg-amber-600 rounded-md text-amber-50 font-bold text-xl">
              {view === "Sign up"
                ? isSubmitting
                  ? "Signing..."
                  : "Sign up"
                : isSubmitting
                ? "Logging..."
                : "Login"}
            </button>
          </div>
        </form>
        <div>
          {view === "Sign up" ? (
            <p className="text-amber-50 mt-4 cursor-pointer hover:text-amber-100">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setView("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-amber-50 mt-4 cursor-pointer hover:text-amber-100">
              Don't have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setView("Sign up")}
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
