import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostById, updatePostById } from "../../api/posts";
import "./editPost.scss";
import { useTranslation } from "react-i18next";

const EditPost: React.FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation("editPost");
  const queryClient = useQueryClient();

  // ✅ Fetch post directly from cache or server
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 🔥 Sync local state with post data when available
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: (updated: { title: string; body: string }) =>
      updatePostById(postId, updated),
    onSuccess: (updatedPost) => {
      // ✅ Update single post cache directly
      queryClient.setQueryData(["post", postId], updatedPost);

      // ✅ Update posts list cache
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return old.map((p: any) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );
      });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ title, body });
  };

  if (isLoading) return <p>{t("loadingPost")}</p>;
  if (!post) return <p>{t("postNotFound")}</p>;

  return (
    <div className="edit-post">
      <h4>{post.title}</h4>

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
