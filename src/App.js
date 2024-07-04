import React from "react";
import PostsList from "./components/PostsList";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>My Posts</h1>
      <PostsList/>
    </div>
  );
};

export default App;
