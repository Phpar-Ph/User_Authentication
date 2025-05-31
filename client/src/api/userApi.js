import axios from "axios";

const backendUrl = "http://localhost:5000";

export const createPost = async (postData) => {
  const { data } = await axios.post(
    backendUrl + "/api/post/create-post",
    { description: postData.description },
    { withCredentials: true }
  );
  return data.json();
};

export const fetchPost = async () => {
  const { data } = await axios.get(`${backendUrl}/api/post/get-post`, {
    withCredentials: true,
  });
  return data.post;
};

// export const getAuthState = async () => {

//       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
//         withCredentials: true,
//       });
//    fetchPost()
//   };
