// 4.3 dummy test
const dummy = (blogs) => {
  return 1;
};

// 4.4 Define a new totalLikes function that receives a list of blog posts as a
// parameter
const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

// 4.5 finds out which blog has the most likes.
const favoriteBlog = (blogs) => {
  const maxLikesBlog = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  });
  return maxLikesBlog;
};

// 4.6 returns the author who has the largest amount of blogs.
const mostBlogs = (blogs) => {
  const blogToAuthor = new Map();
  blogs.forEach(blog => {
    blogToAuthor.set(blog.author, (blogToAuthor.get(blog.author) || 0) + 1);
  });
  const [Author, Count] = [...blogToAuthor.entries()].reduce(
      (max, current) => (current[1] > max[1] ? current : max), ['', 0]);

  return {
    author: Author,
    blogs: Count,
  };
};

// 4.4 returns the author who has the most likes of blogs.
const mostLikes = (blogs) => {
  const blogToAuthor = new Map();
  blogs.forEach(blog => {
    blogToAuthor.set(
        blog.author, (blogToAuthor.get(blog.author) || 0) + blog.likes);
  });
  const [Author, Likes] = [...blogToAuthor.entries()].reduce(
      (max, current) => (current[1] > max[1] ? current : max), ['', 0]);

  return {
    author: Author,
    blogs: Likes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
