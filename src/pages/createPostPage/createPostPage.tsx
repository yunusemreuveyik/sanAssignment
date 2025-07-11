import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../api/posts";
import "./createPostPage.scss";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../api/queries/reactQuery";

const CreatePost: React.FC = () => {
  const { t } = useTranslation("createPostPage");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, status, isSuccess, isError } = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      setTitle("");
      setBody("");
      // we could invalidate queries, but let's directly update the cache this time just for demonstration
      // ✅ Directly update posts cache with the new post
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return [newPost];
        return [newPost, ...old]; // add to top
      });
    },
  });

  const isLoading = status === "pending";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body });
  };

  return (
    <div className="create-post">
      <h1 className="create-post__title">{t("createTitle")}</h1>
      <form className="create-post__form" onSubmit={handleSubmit}>
        <div className="create-post__field">
          <label htmlFor="title">{t("titleLabel")}</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("titlePlaceholder")}
            required
          />
        </div>

        <div className="create-post__field">
          <label htmlFor="body">{t("bodyLabel")}</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("bodyPlaceholder")}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? t("creating") : t("createButton")}
        </button>

        {isSuccess && (
          <p className="create-post__success">{t("successMessage")}</p>
        )}
        {isError && <p className="create-post__error">{t("errorMessage")}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
