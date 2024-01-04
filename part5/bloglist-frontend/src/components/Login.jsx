const handleLogin = async (event) => {
    event.preventDefault()

    try {
        const user = await loginService.login({
            username, password,
        })
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        setNotification('Successful login')
        setNotificationType('note')
        setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
        }, 3000)
    } catch (exception) {
        setNotification('Wrong credentials')
        setNotificationType('error')
        setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
        }, 3000)
    }
}

const LoginForm = (props) => (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={props.username}
                    name="Username"
                    onChange={({ target }) => props.setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={props.password}
                    name="Password"
                    onChange={({ target }) => props.setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
)

export default LoginForm 