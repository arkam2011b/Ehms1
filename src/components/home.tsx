import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./auth/LoginForm";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onSuccess={() => navigate("/dashboard")} />
    </div>
  );
}

export default Home;
