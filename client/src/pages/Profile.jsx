import { UploadDropzone } from "../uploadThing/UploadThing";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../context/AppContentProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Profile = () => {
  const { backendUrl, getUserData, setProfilePic, userData } =
    useContext(AppContent);
  const navigate = useNavigate();
  const saveProfilePicture = async (fileUrl) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/add-profile-pic`,
        { profilePic: fileUrl },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile picture"
      );
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-amber-950  text-center mb-10">
          Profile Page
        </h1>
      </div>
      <div className="mb-10">
        <h1>Name: {userData?.name}</h1> <h1>Email: {userData?.email}</h1>
        {userData?.isAccountVerified ? (
          <h1>Account is verified </h1>
        ) : (
          <h1>Account is not verified</h1>
        )}
      </div>
      <div className="absolute top-0 left-0 p-10 ">
        <h1
          className="hover:text-amber-700 text-2xl font-bold text-amber-800 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Bact to Home
        </h1>
      </div>
      <div>
        <p>Add your profile picture here</p>
        <UploadDropzone
          endpoint={(routeRegistry) => routeRegistry.videoAndImage}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.ufsUrl) {
              setProfilePic(res[0].ufsUrl);
              saveProfilePicture(res[0].ufsUrl);
            }
            navigate("/");
          }}
          onUploadError={(error) => {
            console.error(error, error.cause);
            alert("Upload failed");
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
