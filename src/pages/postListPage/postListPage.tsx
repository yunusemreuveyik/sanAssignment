import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsQueryOptions } from "../../api/queries/postQueryOptions";
import { useNav } from "../../routes/nav";
import { useAuth } from "../../api/useAuth";
import "./postListPage.scss";
import { hasPermission } from "../../routes/pagePermissions";
import { deletePostById } from "../../api/posts";
import { routeNames } from "../../routes/routes";

const PostListPage: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery(postsQueryOptions);
  const { go } = useNav();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryOptions.queryKey });
    },
  });

  const handleEdit = (id: string) => {
    go(routeNames.post, { id });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="posts">
      <h1>Posts</h1>
      <ul className="posts__list">
        {posts.map((post: any) => (
          <li key={post.id} className="posts__item">
            <span>{post.title}</span>
            {hasPermission(user, ["EDIT_POST"]) && (
              <button onClick={() => handleEdit(post.id)}>Edit</button>
            )}
            {hasPermission(user, ["DELETE_POST"]) && (
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListPage;
