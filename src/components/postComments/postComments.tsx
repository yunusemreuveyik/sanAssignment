import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId } from "../../api/posts";
import "./postComments.scss";

const PostComments: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  if (isLoading) return <p>Loading comments...</p>;

  if (!comments || comments.length === 0)
    return <p>No comments for this post.</p>;

  return (
    <div className="comments-tab">
      <h2>Comments</h2>
      <ul className="comments-tab__list">
        {comments.map((c: any) => (
          <li key={c.id} className="comments-tab__item">
            <p className="comments-tab__body">{c.body}</p>
            <p className="comments-tab__author">By: {c.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
