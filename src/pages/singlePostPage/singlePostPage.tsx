import React from "react";
import { useParams } from "react-router-dom";

const Post: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Post Details - ID: {id}</h1>
      {/* Display post details */}
      <div className="mt-4">
        <h2 className="font-bold">Tabs</h2>
        <ul className="flex gap-4 mt-2">
          <li>
            <a href={`/posts/${id}/edit`} className="text-blue-500">
              Edit Post
            </a>
          </li>
          <li>
            <a href={`/posts/${id}/comments`} className="text-blue-500">
              Comments
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
