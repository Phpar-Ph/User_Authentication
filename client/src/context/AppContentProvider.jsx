import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [profilePic, setProfilePic] = useState(null);
  const [getPostData, setGetPostData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setIsLogin(true);
        getUserData();
        getPost();
      }
    } catch (error) {
      // Only show error toast if it's not an auth error
      if (error.response?.status !== 401) {
        toast.error("Authentication check failed");
      }
    }
  };

  const getPost = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/post/get-post`, {
        withCredentials: true,
      });
      console.log("UserPost :", data.post);
      if (data.success) {
        setGetPostData(data.post);
      }
    } catch (error) {
      console.error("Get user data error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch post data");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      // console.log("User data response:", data); // Debug log

      if (data.success) {
        setUserData(data.userData);

        // console.log("Updated userData:", data.userData); // Debug log
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Get user data error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    backendUrl,
    setProfilePic,
    profilePic,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    getPost,
    getPostData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
