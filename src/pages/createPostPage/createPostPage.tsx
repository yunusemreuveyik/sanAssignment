import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../api/services/posts";
import "./createPostPage.scss";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../api/queries/reactQuery";
import { useToast } from "../../api/services/toastService"; // ✅ import toast hook
import Spinner from "../../components/buttonLoader/buttonLoader";

const CreatePost: React.FC = () => {
  const { t } = useTranslation("createPostPage");
  const { triggerToast } = useToast(); // ✅ initialize toast

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, status } = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      setTitle("");
      setBody("");

      // ✅ Update posts cache with new post
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return [newPost];
        return [...old, newPost];
      });

      triggerToast("success", t("successMessage")); // ✅ show success toast
    },
    onError: () => {
      triggerToast("error", t("errorMessage")); // ✅ show error toast
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
          {isLoading ? <Spinner size={18} color="gold" /> : t("createButton")}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
