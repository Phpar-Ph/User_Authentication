import { UploadDropzone } from "../uploadThing/UploadThing";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContentProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BackToHome from "../components/BackToHome";

const Profile = () => {
  const { backendUrl, getUserData, setProfilePic, userData } =
    useContext(AppContent);
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const users = {
    name: userData?.name || "",
    email: userData?.email || "",
  };
  const [user, setUser] = useState(users);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };
  const handleEdit = () => {
    setUser({
      name: userData?.name || "",
      email: userData?.email || "",
    });
    setShowEdit(true);
  };
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

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`${backendUrl}/api/auth/update-user-info`, user, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200">
      {/* Back Button */}
      <BackToHome />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-amber-950 text-center mb-8">
            Profile Settings
          </h1>

          {/* User Info Card */}
          <div className="bg-amber-50 rounded-xl p-8 relative mb-8 shadow-md ">
            <div className="absolute top-0 right-4">
              {!showEdit ? (
                <h1
                  className="text-xl font-semibold text-amber-900 cursor-pointer hover:text-amber-600"
                  onClick={handleEdit}
                >
                  Edit Profile
                </h1>
              ) : (
                <h1
                  className="text-2xl font-bold text-amber-900 cursor-pointer hover:text-amber-600"
                  onClick={() => setShowEdit(false)}
                >
                  x
                </h1>
              )}
            </div>
            {!showEdit ? (
              <div className="space-y-4  ">
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
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700">✓</span>
                    <span className="font-semibold text-amber-900 text-lg">
                      Status:
                    </span>

                    <p className="text-lg">
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
                  {!userData?.isAccountVerified && (
                    <button
                      className="bg-green-800 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 hover:cursor-pointer"
                      onClick={() => navigate("/email-verify")}
                    >
                      Verify Email
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-amber-700">🔄</span>
                    <span className="font-semibold text-amber-900 text-lg">
                      Reset Password
                    </span>
                  </div>
                  <p className="text-lg">
                    <button
                      className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={() => navigate("/reset-password")}
                    >
                      Reset Password
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <form onSubmit={submitForm}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 ">
                      <span className="text-amber-700 ">👤</span>
                      <div className="flex-1">
                        <label className="block font-semibold text-amber-900 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={user.name}
                          onChange={inputHandler}
                          className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors bg-white/80 text-amber-900 placeholder-amber-300"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-700">📧</span>
                      <div className="flex-1">
                        <label className="block font-semibold text-amber-900 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={user.email}
                          onChange={inputHandler}
                          className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors bg-white/80 text-amber-900 placeholder-amber-300"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-8">
                      <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="text-center">
            {!showUpload && !showEdit ? (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Upload Profile Picture
              </button>
            ) : (
              !showEdit && (
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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
