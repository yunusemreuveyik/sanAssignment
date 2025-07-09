import React from "react";

const Forbidden: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">403 - Forbidden</h1>
      <p className="mt-2">You don't have permission to access this page.</p>
    </div>
  );
};

export default Forbidden;
