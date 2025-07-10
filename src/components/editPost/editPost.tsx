import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostById } from "../../api/posts";
import "./editPost.scss";
import { useTranslation } from "react-i18next";

interface Post {
  id: string;
  title: string;
  body: string;
}

const EditPost: React.FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation("editPost");
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updated: { title: string; body: string }) =>
      updatePostById(post.id, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.id] });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ title, body });
  };

  return (
    <div className="edit-post">
      <div className="edit-post__field">
        <label>{t("titleLabel")}</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("titlePlaceholder")}
        />
      </div>
      <div className="edit-post__field">
        <label>{t("bodyLabel")}</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("bodyPlaceholder")}
        />
      </div>
      <button className="edit-post__save" onClick={handleSave}>
        {t("saveButton")}
      </button>
      {updateMutation.isSuccess && (
        <p className="edit-post__success">{t("updateSuccess")}</p>
      )}
      {updateMutation.isError && (
        <p className="edit-post__error">{t("updateError")}</p>
      )}
    </div>
  );
};

export default EditPost;
