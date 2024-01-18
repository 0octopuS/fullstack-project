import Blog from "./Blog";
const BlogList = ({ user, blogs, like, remove }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  return (
    <div>
      <h2> Blogs </h2>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog)}
          canRemove={user && blog.user.username === user.username}
          remove={() => remove(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
