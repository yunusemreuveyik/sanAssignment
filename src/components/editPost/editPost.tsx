import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostById, updatePostById } from "../../api/services/posts";
import "./editPost.scss";
import { useTranslation } from "react-i18next";
import { useToast } from "../../api/services/toastService";
import { ToastType } from "../../api/models/toastModel";
import Spinner from "../buttonLoader/buttonLoader";

const EditPost: React.FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation("editPost");
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  const { data: post, isLoading: isFetchingPost } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
      // ✅ Update caches
      queryClient.setQueryData(["post", postId], updatedPost);
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return old.map((p: any) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );
      });
      triggerToast(ToastType.SUCCESS, t("updateSuccess"));
    },
    onError: () => {
      triggerToast(ToastType.ERROR, t("updateError"));
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ title, body });
  };

  if (isFetchingPost) return <p>{t("loadingPost")}</p>;
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

      <button
        className="edit-post__save"
        onClick={handleSave}
        disabled={updateMutation.status === "pending"}
      >
        {updateMutation.status === "pending" ? (
          <Spinner size={18} color="gold" />
        ) : (
          t("saveButton")
        )}
      </button>
    </div>
  );
};

export default EditPost;
