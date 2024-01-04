import { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

// 5.6 Separate the form for creating a new blog into its own component
const Blog = ({ user, blog, updateBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // 5.7 add a button to each blog, which controls whether all of the details about the blog are shown or not
  const [detailVisible, setDetailVisible] = useState(false)
  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  // 5.9 Implement the functionality for the like button.
  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    if (updatedBlog.user && updatedBlog.user.id) {
      updatedBlog.user._id = updatedBlog.user.id
      delete updatedBlog.user.id
    }
    try {
      const updatedResult = await blogService.update(blog.id, updatedBlog)
      updateBlogs()
    } catch (error) {
      console.log(error)
    }
  }


  // 5.11 delete functionality
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        // After successful deletion, update the list of blogs
        updateBlogs()
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  return (
    <div style={blogStyle}>

      <div>
        <div style={hideWhenVisible}>
          <div>
            {blog.title}{blog.author}
          </div>

          <button onClick={() => setDetailVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          <p> title : {blog.title} </p>
          <p> url   : {blog.url}</p>
          <p> likes : {blog.likes} <button onClick={() => addLike()}>like</button></p>
          <p> author: {blog.author}</p>
          <p> <button onClick={() => setDetailVisible(false)}>hide</button></p>
          {console.log(user, blog.user)}
          {user && blog.user && user.id === blog.user.id && (
            <p> <button onClick={handleDelete}>Delete</button> </p>
          )}
        </div>
      </div>
    </div>
  )
}



const BlogForm = ({ user, handleNewBlog }) => {
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  // 5.8 new blog is created in the app and displayed
  const updateBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()
    // Pass both event and form data to the parent handleNewBlog function
    await handleNewBlog({ title, author, url })
    updateBlogs()
    // Clear form fields or perform any other necessary actions
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2> create new </h2>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="title"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="author"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="url"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>

      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} updateBlogs={updateBlogs} />
          ))
      }
    </div >)
} // 5.10 Modify the application to list the blog posts by the number of likes.

export default BlogForm