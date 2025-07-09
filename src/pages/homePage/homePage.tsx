import React from "react";

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="font-bold mb-2">Recent Posts</h2>
          {/* Fetch and display 5 recent posts here */}
        </div>
        <div className="border p-4">
          <h2 className="font-bold mb-2">Recent Comments</h2>
          {/* Fetch and display 5 recent comments here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
