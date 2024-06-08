

const LoginForm = ({submitLogin, setEmail, setPassword, email, password}) => {

  return(
    <form onSubmit={submitLogin}>
      <label htmlFor="email">Email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} required/>
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm