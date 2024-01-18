// 7.16 Implement a separate view for blog posts.
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../services/blogs";
import Comments from "./Comments";
const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    const fetchedBlog = await getBlog(blogId);
    setBlog(fetchedBlog);
  };

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  if (!blog.comments) {
    blog.comments = [];
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        URL: <a href={blog.url}> {blog.url}</a>{" "}
      </p>
      <p>Likes: {blog.likes}</p>
      <p>Author: {blog.author}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <Comments blogId={blog.id} fetchBlog={fetchBlog} />
    </div>
  );
};

export default BlogDetails;
