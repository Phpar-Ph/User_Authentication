import { React, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPost, createPost } from "../api/userApi";
function Home() {
  const { userData, getUserData, isLogin, backendUrl, getPost, getPostData } =
    useContext(AppContent);
  const navigate = useNavigate();
  const [description, setDescription] = useState();
  const defaultImage =
    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg";

  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPost,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    // onSuccess: () => {
    //   // Invalidate and refetch
    //   queryClient.invalidateQueries({ queryKey: ['todos'] })
    // },
  });

  const handleChange = (e) => {
    setDescription(e.target.value);
    mutation(description);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/post/create-post",
        { description },
        { withCredentials: true }
      );

      if (data.success) {
        getUserData();
        setDescription("");
        navigate("/");
      }
    } catch (error) {
      console.log("Error");
      toast.error(error.message || "an error getUserData");
    }
  };
  useEffect(() => {
    isLogin && getUserData() && getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {getPostData?.map((post) => (
            <h1 key={post._id}>{post.description}</h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
