// 4.1 post and get run successful
const blogRouter = require('express').Router()
const middleware = require('../utils/middleware');


const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')



// 4.8 refactor router to use async/await
blogRouter.get('/', async (request, response, next) => {
  try {
    // 4.17 Modify listing all blogs so that the creator's user information is
    // displayed with the blog
    const blogs = await Blog.find({}).populate('user');
    response.json(blogs);
  } catch (error) {
    next(error);
  }
  // Blog.find({}).then(blogs => { response.json(blogs) })
});

blogRouter.post('/', async (request, response, next) => {
  try {
    // 4.19 it is only possible if a valid token is sent with the HTTP POST
    // request
    const user = request.user;
    if (!user) {
      return response.status(401).json({error: 'Token invalid'});
    }
    // 4.17 any user from the database is designated as its creator
    const blog = new Blog({
      ...request.body,
      user: user.id,
    });

    const savedBlog = await blog.save();
    await savedBlog.populate('user');

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// 4.13 delete a post
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    // 4.21 blog can be deleted only by the user who added the blog
    const user = request.user;

    const blogId = request.params.id;
    const blogToDelete = await Blog.findById(blogId);
    if (!blogToDelete) {
      return response.status(404).json({error: 'Blog not found'});
    }
    if (blogToDelete.user.toString() !== user.id.toString()) {
      return response.status(403).json({error: 'Permission denied'});
    }

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