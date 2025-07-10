import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../api/posts";
import EditPost from "../../components/editPost/editPost";
import { useAuth } from "../../api/useAuth";
import { hasPermission } from "../../routes/pagePermissions";
import "./singlePostPage.scss";
import PostComments from "../../components/postComments/postComments";
import { useTranslation } from "react-i18next";

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"edit" | "comments">("edit");
  const { user } = useAuth();
  const { t } = useTranslation("singlePostPage");

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
  });

  if (postLoading) return <p>{t("loadingPost")}</p>;
  if (!post) return <p>{t("postNotFound")}</p>;

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
            {t("editPostTab")}
          </button>
        )}
        {canViewComments && (
          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => setActiveTab("comments")}
          >
            {t("postCommentsTab")}
          </button>
        )}
      </div>

      <div className="single-post__content">
        {activeTab === "edit" && canEdit && <EditPost post={post} />}
        {activeTab === "comments" && canViewComments && (
          <PostComments postId={id!} />
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
