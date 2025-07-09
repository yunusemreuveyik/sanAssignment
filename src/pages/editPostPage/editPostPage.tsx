import React from "react";
import { useParams } from "react-router-dom";

const EditPost: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Edit Post - ID: {id}</h1>
      {/* Form to edit post data */}
    </div>
  );
};

export default EditPost;
