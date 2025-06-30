const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
        data-testid='username'
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
        data-testid='password'
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm