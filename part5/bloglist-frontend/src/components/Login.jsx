import PropTypes from 'prop-types'


// 5.1 Implement login functionality to the frontend.
const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <form id='login-form' onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        id='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        id='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id='login-button' type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm