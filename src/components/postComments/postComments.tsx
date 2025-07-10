import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId } from "../../api/posts";
import "./postComments.scss";
import { useTranslation } from "react-i18next";

const PostComments: React.FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation("postComments");

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  if (isLoading) return <p>{t("loading")}</p>;

  if (!comments || comments.length === 0) return <p>{t("noComments")}</p>;

  return (
    <div className="comments-tab">
      <h2>{t("commentsTitle")}</h2>
      <ul className="comments-tab__list">
        {comments.map((c: any) => (
          <li key={c.id} className="comments-tab__item">
            <p className="comments-tab__body">{c.body}</p>
            <p className="comments-tab__author">
              {t("by")} {c.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
