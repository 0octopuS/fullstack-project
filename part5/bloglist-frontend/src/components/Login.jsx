import PropTypes from 'prop-types'


// 5.1 Implement login functionality to the frontend.
const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm