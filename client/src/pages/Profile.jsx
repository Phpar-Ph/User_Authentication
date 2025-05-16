import { UploadDropzone } from "../uploadThing/UploadThing";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContentProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Profile = () => {
  const { backendUrl, getUserData, setProfilePic, userData } =
    useContext(AppContent);
  const [showUpload, setShowUpload] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors"
        >
          <span className="text-2xl">←</span>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-amber-950 text-center mb-8">
            Profile Settings
          </h1>

          {/* User Info Card */}
          <div className="bg-amber-50 rounded-xl p-6 mb-8 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-700">👤</span>
                <p className="text-lg">
                  <span className="font-semibold text-amber-900">Name:</span>{" "}
                  <span className="text-amber-800">{userData?.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700">📧</span>
                <p className="text-lg">
                  <span className="font-semibold text-amber-900">Email:</span>{" "}
                  <span className="text-amber-800">{userData?.email}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700">✓</span>
                <p className="text-lg">
                  <span className="font-semibold text-amber-900">Status:</span>{" "}
                  <span
                    className={`${
                      userData?.isAccountVerified
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {userData?.isAccountVerified
                      ? "Verified Account"
                      : "Verification Pending"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="text-center">
            {!showUpload ? (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Upload Profile Picture
              </button>
            ) : (
              <div className="bg-amber-50 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-amber-900">
                    Choose an Image
                  </h3>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    ✕
                  </button>
                </div>
                <UploadDropzone
                  endpoint={(routeRegistry) => routeRegistry.videoAndImage}
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.ufsUrl) {
                      setProfilePic(res[0].ufsUrl);
                      saveProfilePicture(res[0].ufsUrl);
                    }
                    setShowUpload(false);
                    navigate("/");
                  }}
                  onUploadError={(error) => {
                    console.error(error, error.cause);
                    alert("Upload failed");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
