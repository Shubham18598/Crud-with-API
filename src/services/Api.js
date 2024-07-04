import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error fetching posts.");
    throw error;
  }
};

export const addPost = async (newPost) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    toast.success("Post added successfully!");
    return data;
  } catch (error) {
    toast.error("Error adding post.");
    throw error;
  }
};

export const updatePost = async (updatedPost) => {
  try {
    const response = await fetch(`${API_URL}/${updatedPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    toast.success("Post updated successfully!");
    return data;
  } catch (error) {
    toast.error("Error updating post.");
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    toast.success("Post deleted successfully!");
  } catch (error) {
    toast.error("Error deleting post.");
    throw error;
  }
};
