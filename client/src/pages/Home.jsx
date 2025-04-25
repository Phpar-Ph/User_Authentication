import { React, useContext } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";
import { UploadDropzone } from "../uploadThing/UploadThing";

function Home() {
  const { userData } = useContext(AppContent);
  const BACKEND_URL = "http://localhost:5000";
  return (
    <div className="h-full w-full bg-blue-300">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <div className="p-4 mb-4">
            <img
              src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
              alt="Profile"
              className="w-96 h-96 rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-amber-950  text-center">
            HEY {userData ? userData.name : "Developer"}
          </h1>
        </div>
        <div>
          {userData && (
            <UploadDropzone
              endpoint={(routeRegistry) => routeRegistry.videoAndImage}
              onClientUploadComplete={(file) => {
                console.log("uploaded", file);
                alert("Upload complete");
              }}
              onUploadError={(error) => {
                console.error(error, error.cause);
                alert("Upload failed");
              }}
              className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-white hover:bg-gray-50 transition duration-300 cursor-pointer text-center space-y-2 text-gray-600"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
