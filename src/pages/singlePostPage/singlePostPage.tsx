import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../api/posts";
import PostCommentsTab from "../../components/postCommentsTab/postCommentsTab";
import EditPost from "../editPost/editPost";
import { useAuth } from "../../api/useAuth";
import { hasPermission } from "../../routes/pagePermissions";
import "./singlePostPage.scss";

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"edit" | "comments">("edit");
  const { user } = useAuth();

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
  });

  if (postLoading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  const canEdit = hasPermission(user, ["EDIT_POST"]);
  const canViewComments = hasPermission(user, ["VIEW_COMMENTS"]);

  return (
    <div className="single-post">
      <h4>{post.title}</h4>
      <div className="single-post__tabs">
        {canEdit && (
          <button
            className={activeTab === "edit" ? "active" : ""}
            onClick={() => setActiveTab("edit")}
          >
            Edit Post
          </button>
        )}
        {canViewComments && (
          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => setActiveTab("comments")}
          >
            Post Comments
          </button>
        )}
      </div>

      <div className="single-post__content">
        {activeTab === "edit" && canEdit && <EditPost post={post} />}
        {activeTab === "comments" && canViewComments && (
          <PostCommentsTab postId={id!} />
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
