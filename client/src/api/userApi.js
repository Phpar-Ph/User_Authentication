import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
const backendUrl = "http://localhost:5000";
import { toast } from "react-toastify";

export const createPost = async (formData) => {
  const { data } = await axios.post(
    backendUrl + "/api/post/create-post",
    { description: formData.description },
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

export const useLoginUsers = () => {
  return useMutation({
    mutationFn: (data) =>
      axios
        .post(backendUrl + "/api/auth/login", data, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: () => {
      // saveState("userData",data);
      toast.success("Sign in successful!");
    },
    onError: () => {
      toast.error("Sign-in failed, please try again.");
    },
  });
};
// REgister
export const useRegister = () => {
  return useMutation({
    mutationFn: (data) =>
      axios
        .post(
          backendUrl + "/api/auth/register",
          {
            name: data.name,
            email: data.email,
            password: data.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      // saveState("userData", data);

      toast.success("Sign up successful!");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });
};

export const useGetUserData = (enabled) => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios
        .get(`${backendUrl}/api/user/data`, { withCredentials: true })
        .then((res) => res.data.userData),
    enabled,
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};

export const useGetUserAuth = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: () =>
      axios
        .get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
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
