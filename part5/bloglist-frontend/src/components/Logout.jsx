const LogoutForm = ({ user, handleLogout }) => (
  <div>
    <h2>blogs</h2>
    <p> {user.username} logged in </p>
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  </div>
)


export default LogoutForm