import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Successful login')
      setNotificationType('note')
      setTimeout(() => {
        setNotification(null); setNotificationType(null)
      }, 3000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null); setNotificationType(null)
      }, 5000)
    }
  }

  // 5.1 Implement login functionality to the frontend.
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // 5.3  allow a logged-in user to add new blogs


  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const result = await blogService.create(
        { "title": title, "author": author, url: "url" }
      )
      setNotification(`A new blog "${title}" is created by ${author}`)
      setNotificationType('note')
      setTimeout(() => {
        setNotification(null); setNotificationType(null)
      }, 3000)
    }
    catch (exception) {
      setNotification('Creating new blog failed.')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null); setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p> {user.username} logged in </p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <h2> create new </h2>
      <form onSubmit={handleNewBlog}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  // 5.4 notifications for different type of msg
  return (
    <div>
      <h1> Blog Lists </h1>
      <Notification message={notification} type={notificationType} />
      {user === null && loginForm()}
      {user !== null && blogForm()}


    </div>
  )
}

export default App