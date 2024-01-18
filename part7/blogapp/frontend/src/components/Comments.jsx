import React, { useState } from "react";
import axios from "axios";
import blogService from "../services/blogs";
// 7.18 Implement the functionality for commenting on blog posts
// 7.19 Extend your application so that users can add comments to blog posts from the frontend
const Comments = ({ blogId, fetchBlog }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await blogService.makeComment(blogId, newComment);
    fetchBlog();
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <label>
          Add a comment:
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
