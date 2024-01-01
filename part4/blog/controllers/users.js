const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const {ValidationError} = require('mongoose').Error;
usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}, {passwordHash: 0}).populate('blog');
    response.json(users);
  } catch (error) {
    next(error);
  }
});

// 4.15 create new users by doing an HTTP POST request to address api/users
usersRouter.post('/', async (request, response, next) => {
  try {
    const {username, name, password, blog} = request.body;

    // Validation checks
    // 4.16 The operation must respond with a suitable status code and some kind
    // of an error message if an invalid user is created.
    if (!username || !password) {
      const validationError = new ValidationError();
      validationError.errors['username'] = new ValidationError.ValidatorError({
        message: 'Both username and password must be provided',
        path: 'username',
        value: '',
      });
      throw validationError;
    }

    if (username.length < 3 || password.length < 3) {
      const validationError = new ValidationError();
      validationError.errors['username'] = new ValidationError.ValidatorError({
        message: 'Username must be at least 3 characters long',
        path: 'username',
      });
      throw validationError;
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({username});
    if (existingUser) {
      const validationError = new ValidationError();
      validationError.errors['username'] = new ValidationError.ValidatorError({
        message: 'Username must be unique',
        path: 'username',
        value: '',
      });
      throw validationError;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      blog,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
})

module.exports = usersRouter;