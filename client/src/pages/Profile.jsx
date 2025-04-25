import React from "react";
import { UploadDropzone } from "../uploadThing/UploadThing";

const Profile = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-amber-950  text-center">
          Profile Page
        </h1>
      </div>
      <div>
        <p>Add your profile here</p>
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
          className=" "
        />
      </div>
    </div>
  );
};

export default Profile;
