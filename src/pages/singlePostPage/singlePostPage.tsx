import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../api/services/useAuth";
import { hasPermission } from "../../routes/pagePermissions";
import "./singlePostPage.scss";
import EditPost from "../../components/editPost/editPost";
import PostComments from "../../components/postComments/postComments";
import { useTranslation } from "react-i18next";

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"edit" | "comments">("edit");
  const { user } = useAuth();
  const { t } = useTranslation("singlePostPage");

  const canEdit = hasPermission(user, ["EDIT_POST"]);
  const canViewComments = hasPermission(user, ["VIEW_COMMENTS"]);

  return (
    <div className="single-post">
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
        {activeTab === "edit" && canEdit && <EditPost postId={id!} />}
        {activeTab === "comments" && canViewComments && (
          <PostComments postId={id!} />
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
