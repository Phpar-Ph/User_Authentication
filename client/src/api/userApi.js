import axios from "axios";
import { userViewStore } from "../store/userStore";

const backendUrl = "http://localhost:5000";

export const createPost = async (description) => {
  const { data } = await axios.post(
    backendUrl + "/api/post/create-post",
    { description },
    { withCredentials: true }
  );
  return data;
};

export const fetchPost = async () => {
  const { data } = await axios.get(`${backendUrl}/api/post/get-post`, {
    withCredentials: true,
  });
  return data.post;
};

export const userAuth = async ({ data }) => {
  const { view } = userViewStore();
  try {
    axios.defaults.withCredentials = true;
    let response;
    if (view === "Sign up") {
      response = await axios.post(backendUrl + "/api/auth/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
    } else {
      response = await axios.post(backendUrl + "/api/auth/login", {
        email: data.email,
        password: data.password,
      });
    }
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Authentication failed." };
  }
};

export const isAuth = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error.message || "Authentication check failed");
  }
};

export const getUserData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/data`, {
      withCredentials: true,
    });
    return data.userData;
  } catch (error) {
    console.error("Get user data error:", error.message);
  }
};

export const logout = async () => {
  try {
    axios.defaults.withCredentials = true;
    const { data } = await axios.post(backendUrl + "/api/auth/logout");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
