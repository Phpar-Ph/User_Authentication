import { React, useContext } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContentProvider";

function Home() {
  const { userData } = useContext(AppContent);

  return (
    <div className="h-full w-full bg-blue-300">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <h1 className="text-4xl font-bold text-amber-950">
            HEY {userData ? userData.name : "Developer"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
