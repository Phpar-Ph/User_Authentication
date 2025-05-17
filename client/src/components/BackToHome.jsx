import { useNavigate } from "react-router";

function BackToHome() {
  const navigate = useNavigate();
  return (
    <div className="absolute top-4 left-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors"
      >
        <span className="text-2xl">←</span>
        <span className="font-semibold">Back to Home</span>
      </button>
    </div>
  );
}

export default BackToHome;
