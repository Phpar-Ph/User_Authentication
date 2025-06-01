import { React } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

import { useGetUserData, useGetUserAuth } from "../api/userApi";
import { useLoginStateStore } from "../store/userStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost, useFetchPost } from "../api/postApi";
const postSchema = z.object({
  description: z.string(10, "Enter a post"),
});

function Home() {
  const navigate = useNavigate();
  const isLogin = useLoginStateStore((state) => state.isLogin);
  // Post Data
  const { data: postData } = useFetchPost(isLogin);
  const { mutate } = useCreatePost();
  //  User Data
  const { data: authData } = useGetUserAuth(isLogin);
  const isAuthenticated = authData?.success ?? false;
  const {
    data: userData,
    isLoading: userLoading,
    error,
  } = useGetUserData(isAuthenticated);
  console.log("POST", postData);
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: "",
    },
  });
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";

  const submit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

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

          {/* POST FIELD AND BUTTON */}
          {isLogin && (
            <div className=" w-1/2">
              <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="post" className="block w-full">
                  Post
                  <textarea
                    {...register("description")}
                    placeholder="Enter post..."
                    className="bg-amber-50 block w-full"
                  ></textarea>
                </label>
                <button type="submit" className="bg-blue-400 text-amber-50 p-4">
                  Post
                </button>
              </form>
              {userLoading && <p>Loading...</p>}
              {error && <p>Error fetching data {error.message}</p>}
              <div className="p-4 bg-gray-200 m-4 text-2xl">
                {postData?.map((post) => (
                  <h1 key={post._id}>{post.description}</h1>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
