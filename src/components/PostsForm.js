import React, { useState, useEffect } from "react";

const PostsForm = ({
    editMode,
    editId,
    onAddPost,
    onUpdatePost,
    onCancelEdit,
    existingPost,
  }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    useEffect(() => {
      if (editMode && existingPost) {
        setTitle(existingPost.title);
        setBody(existingPost.body);
      } else {
        setTitle("");
        setBody("");
      }
    }, [editMode, existingPost]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (editMode && editId) {
        onUpdatePost({ id: editId, title, body });
      } else {
        onAddPost({ title, body });
      }
  
      setTitle("");
      setBody("");
    };
  
    return (
      <form className="posts-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editMode ? "Update Post" : "Add Post"}</button>
        {editMode && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    );
  };
  
  export default PostsForm;