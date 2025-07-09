import React from "react";
import { useQuery } from "@tanstack/react-query";
import { postsQueryOptions } from "../../api/queries/postQueryOptions";
import { commentsQueryOptions } from "../../api/queries/commentQueryOptions";

const Home: React.FC = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery(postsQueryOptions);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery(commentsQueryOptions);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="font-bold mb-2">Recent Posts</h2>
          {postsLoading && <p>Loading posts...</p>}
          {postsError && <p>Error loading posts.</p>}
          {posts && (
            <ul>
              {posts.slice(0, 5).map((post: any) => (
                <li key={post.id} className="py-1 border-b">
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border p-4">
          <h2 className="font-bold mb-2">Recent Comments</h2>
          {commentsLoading && <p>Loading comments...</p>}
          {commentsError && <p>Error loading comments.</p>}
          {comments && (
            <ul>
              {comments.slice(0, 5).map((comment: any) => (
                <li key={comment.id} className="py-1 border-b">
                  {comment.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
