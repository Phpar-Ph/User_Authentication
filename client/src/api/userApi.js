import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const backendUrl = "http://localhost:5000";
import { toast } from "react-toastify";

// Login
export const useLoginUsers = () => {
  return useMutation({
    mutationFn: (data) =>
      axios
        .post(
          backendUrl + "/api/auth/login",
          { email: data.email, password: data.password },
          { withCredentials: true }
        )
        .then((res) => res.data),
    // onSuccess: () => {
    //   toast.success("Sign in successful!");
    // },
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
      toast.success("Sign up successful!");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });
};

export const useGetUserData = (enabled = false) => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios
        .get(`${backendUrl}/api/user/data`, {
          withCredentials: true,
        })
        .then((res) => res.data.userData),
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetUserAuth = (enabled = false) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: () =>
      axios
        .get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
        })
        .then((res) => res.data),
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data) => {
      if (!data.success) {
        queryClient.invalidateQueries({ queryKey: ["userData"] });
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
    },
    onSuccess: (data) => {
      queryClient.clear();
      queryClient.invalidateQueries();
      queryClient.setQueryData(["authStatus"], { success: false, user: null });
      toast.success(data.message || "Logged out successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to logout");
    },
  });
};
