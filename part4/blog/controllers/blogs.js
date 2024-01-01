// 4.1 post and get run successful
const blogRouter = require('express').Router()

const Blog = require('../models/blog')

// 4.8 refactor router to use async/await
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
  // Blog.find({}).then(blogs => { response.json(blogs) })
});

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
  // const blog = new Blog(request.body)

  // blog
  //     .save()
  //     .then(result => {
  //         response.status(201).json(result)
  //     })
});

// 4.13 delete a post
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id;
    const deletedBlog = await Blog.findByIdAndRemove(blogId);
    if (!deletedBlog) {
      return response.status(404).json({error: 'Blog not found'});
    }
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// 4.14 update a post
blogRouter.put('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id;
    const blogNew = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId, blogNew, {new: true, runValidators: true});
    if (!updatedBlog) {
      return response.status(404).json({error: 'Blog not found'});
    }
    response.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter