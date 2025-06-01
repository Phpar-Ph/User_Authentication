import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const backendUrl = "http://localhost:5000";
import { toast } from "react-toastify";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      axios
        .post(
          backendUrl + "/api/post/create-post",
          {
            description: data.description,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data || null),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong while fetching user data"
      );
    },
  });
};

export const useFetchPost = (enabled = false) => {
  return useQuery({
    queryKey: ["post"],
    queryFn: () =>
      axios
        .get(`${backendUrl}/api/post/get-post`, { withCredentials: true })
        .then((res) => res.data.post),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    enabled: !!enabled,
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong while fetching user data"
      );
    },
  });
};
