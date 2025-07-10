import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostById } from "../../api/posts";
import "./editPost.scss";

interface Post {
  id: string;
  title: string;
  body: string;
}

const EditPost: React.FC<{ post: Post }> = ({ post }) => {
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
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>
      <div className="edit-post__field">
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post body"
        />
      </div>
      <button className="edit-post__save" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditPost;
