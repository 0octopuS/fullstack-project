const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {logger.info('connected to MongoDB')})
    .catch(
        (error) => {
            logger.error('error connecting to MongoDB:', error.message)})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
// const Blog = require("./models/blog")

// app.get(
//     '/api/blogs',
//     (request,
//         response) => { Blog.find({}).then(blogs => { response.json(blogs) })
//         })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app