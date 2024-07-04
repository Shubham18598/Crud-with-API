import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostsForm from "./PostsForm";
import PostItem from "./PostItem";
import { fetchPosts, addPost, updatePost, deletePost } from "../services/Api";

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
  
    useEffect(() => {
      fetchPosts()
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => {
          toast.error("Error fetching posts.");
          console.error("Error fetching data:", error);
        });
    }, []);
  
    const handleAddPost = async (newPost) => {
      try {
        const data = await addPost(newPost);
        setPosts([data, ...posts]);
      } catch (error) {
        toast.error("Error adding post.");
        console.error("Error adding post:", error);
      }
    };
  
    const handleUpdatePost = async (updatedPost) => {
      try {
        const data = await updatePost(updatedPost);
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost.id ? data : post
        );
        setPosts(updatedPosts);
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        toast.error("Error updating post.");
        console.error("Error updating post:", error);
      }
    };
  
    const handleDeletePost = async (id) => {
      try {
        await deletePost(id);
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      } catch (error) {
        toast.error("Error deleting post.");
        console.error("Error deleting post:", error);
      }
    };
  
    const handleEditPost = (post) => {
      setEditMode(true);
      setEditId(post.id);
    };
  
    const handleCancelEdit = () => {
      setEditMode(false);
      setEditId(null);
    };
  
    return (
      <div className="posts-list">
        <h2>{editMode ? "Edit Post" : "Add Post"}</h2>
        <PostsForm
          editMode={editMode}
          editId={editId}
          onAddPost={handleAddPost}
          onUpdatePost={handleUpdatePost}
          onCancelEdit={handleCancelEdit}
          existingPost={
            editMode ? posts.find((post) => post.id === editId) : null
          }
        />
  
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
            />
          ))}
        </ul>
  
        <ToastContainer />
      </div>
    );
  };
  
  export default PostsList;