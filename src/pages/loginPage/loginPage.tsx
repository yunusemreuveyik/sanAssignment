import React from "react";
import { useAuth } from "../../context/useAuth";
import { useNav } from "../../nav";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { go } = useNav();

  const handleLogin = () => {
    login(); // Sets the dummy user in React Query
    go("home"); // Redirect to home/dashboard page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to OctoFront</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Login as John Doe
      </button>
    </div>
  );
};

export default LoginPage;
