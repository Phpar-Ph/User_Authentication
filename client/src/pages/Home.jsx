import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, createPost } from "../api/userApi";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/userStore";
function Home() {
  const { checkAuth, user, isLogin } = useAuthStore();
  const navigate = useNavigate();
  const [description, setDescription] = useState();
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      if (!isLogin) {
        return [];
      }
      const response = await fetchPost();
      return response;
    },
    enabled: isLogin,
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      toast.error("Please login to create a post");
      navigate("/login");
      return;
    }

    if (!description?.trim()) {
      toast.error("Post cannot be empty");
      return;
    }
    mutate({ description });
    setDescription("");
  };
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Profile Container */}
          <div className="relative group mb-8">
            <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-amber-600">
              <img
                src={user?.profilePic || defaultImage}
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
              {user?.name || "Developer"}
            </h2>
          </div>
          <div className=" w-1/2">
            <label htmlFor="post" className="block w-full">
              Post
              <textarea
                name="post"
                id="post"
                placeholder="Enter post..."
                className="bg-amber-50 block w-full"
                value={description}
                onChange={handleChange}
              ></textarea>
            </label>
            <button
              type="button"
              className="bg-blue-400 text-amber-50 p-4"
              onClick={handleSubmitPost}
            >
              Post
            </button>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data {error.message}</p>}
        <div className="p-4 bg-gray-200 m-4 text-2xl">
          {data?.map((post) => (
            <h1 key={post._id}>{post.description}</h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
