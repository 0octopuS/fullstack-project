import { useState, useEffect } from 'react'
import { BlogForm } from './components/Blog'
import LoginForm from './components/Login'
import LogoutForm from './components/Logout'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const [user, setUser] = useState(null)



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
  // 5.2 set browser storage
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
  }


  // 5.3  allow a logged-in user to add new blogs
  const handleNewBlog = async (formData) => {
    // event.preventDefault()

    const { title, author, url } = formData
    console.log(title, url)
    try {
      const result = await blogService.create(
        { 'title': title, 'author': author, 'url': url }
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



  // 5.4 notifications for different type of msg
  return (
    <div>
      <h1> Blog Lists </h1>
      <Notification message={notification} type={notificationType} />
      {user === null && <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user !== null && <LogoutForm user={user} handleLogout={handleLogout} />}
      {user !== null &&
        <BlogForm user={user} handleNewBlog={handleNewBlog} />}

    </div>
  )
}

export default App