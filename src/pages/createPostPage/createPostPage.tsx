import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../api/posts";
import "./createPostPage.scss";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, status, isSuccess, isError } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle("");
      setBody("");
    },
  });

  const isLoading = status === "pending";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body });
  };

  return (
    <div className="create-post">
      <h1 className="create-post__title">Create New Post</h1>
      <form className="create-post__form" onSubmit={handleSubmit}>
        <div className="create-post__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="create-post__field">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </button>

        {isSuccess && (
          <p className="create-post__success">Post created successfully!</p>
        )}
        {isError && (
          <p className="create-post__error">Failed to create post.</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
