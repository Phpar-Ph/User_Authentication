import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../api/userApi";
import { useLoginStateStore } from "../store/userStore";

const formRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const setIsLogin = useLoginStateStore((state) => state.setIsLogin);
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formRegisterSchema),
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setIsLogin(true);
        navigate("/");
      },
    });
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
          <h2 className="text-2xl font-bold text-amber-50">Create Account</h2>
          <p className="text-gray-300 text-md">"Create your Account"</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col   gap-4 w-96">
            <div>
              <label>
                Full Name
                <input
                  {...register("name")}
                  placeholder="Enter your full name..."
                  className="  outline-none rounded-md  bg-blue-100 border-gray-300 p-4  text-black w-full"
                />
              </label>
              <p className="text-white font-bold">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="">
                Email
                <input
                  {...register("email")}
                  placeholder="Enter your email..."
                  className=" bg-blue-100 rounded-md outline-none border-gray-300 p-4  text-black w-full"
                />
              </label>
              <p className="text-white font-bold">{errors.email?.message}</p>
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
              <p className="text-white font-bold">{errors.password?.message}</p>
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

            <button
              disabled={isSubmitting}
              className="bg-amber-700 p-4 hover:bg-amber-600 rounded-md text-amber-50 font-bold text-xl"
            >
              {isSubmitting ? "Signing..." : "Sign up"}
            </button>
          </div>
        </form>
        <div>
          <p className="text-amber-50 mt-4 cursor-pointer hover:text-amber-100">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
