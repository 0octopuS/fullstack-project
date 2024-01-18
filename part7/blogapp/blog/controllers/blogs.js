const router = require("express").Router();
const Blog = require("../models/blog");

const { userExtractor } = require("../utils/middleware");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

router.get("/:blogId", async (request, response) => {
  const { blogId } = request.params;
  const blog = await Blog.findById(blogId).populate("user", {
    username: 1,
    name: 1,
  });
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  response.json(blog);
});

router.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id).populate("user");

  response.status(201).json(createdBlog);
});

router.put("/:id", async (request, response) => {
  const { title, url, author, likes } = request.body;

  let updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, url, author, likes },
    { new: true },
  );

  updatedBlog = await Blog.findById(updatedBlog._id).populate("user");

  response.json(updatedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

  await user.save();
  await blog.deleteOne();

  response.status(204).end();
});

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Add the comment to the blog's comments array
    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
