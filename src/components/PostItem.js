import React from "react";

const PostItem = ({ post, onEditPost, onDeletePost }) => {
    return (
      <li className="post-item">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button className="btn-edit" onClick={() => onEditPost(post)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDeletePost(post.id)}>
          Delete
        </button>
      </li>
    );
  };
  
  export default PostItem;
