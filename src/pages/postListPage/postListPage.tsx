import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsQueryOptions } from "../../api/queries/postQueryOptions";
import { useNav } from "../../routes/nav";
import { useAuth } from "../../api/useAuth";
import "./postListPage.scss";
import { hasPermission } from "../../routes/pagePermissions";
import { deletePostById } from "../../api/posts";
import { routeNames } from "../../routes/routes";
import { useTranslation } from "react-i18next";

const PostListPage: React.FC = () => {
  const { t } = useTranslation("postListPage");

  const { data: posts, isLoading, error } = useQuery(postsQueryOptions);
  const { go } = useNav();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePostById,
    // 🔥 Optimistically remove from cache
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: postsQueryOptions.queryKey });

      const previousPosts = queryClient.getQueryData(
        postsQueryOptions.queryKey
      );

      queryClient.setQueryData(postsQueryOptions.queryKey, (old: any) =>
        old ? old.filter((p: any) => p.id !== id) : []
      );

      return { previousPosts };
    },
    // ✅ On error, rollback to previous cache state
    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        postsQueryOptions.queryKey,
        context?.previousPosts
      );
    },
  });

  const handleEdit = (id: string) => {
    go(routeNames.post, { id });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>{t("loadingPosts")}</p>;
  if (error) return <p>{t("errorPosts")}</p>;

  return (
    <div className="posts">
      <h1>{t("postsTitle")}</h1>
      <ul className="posts__list">
        {[...posts].reverse().map((post: any) => (
          <li key={post.id} className="posts__item">
            <span>{post.title}</span>
            {hasPermission(user, ["EDIT_POST"]) && (
              <button onClick={() => handleEdit(post.id)}>
                {t("editButton")}
              </button>
            )}
            {hasPermission(user, ["DELETE_POST"]) && (
              <button onClick={() => handleDelete(post.id)}>
                {t("deleteButton")}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListPage;
