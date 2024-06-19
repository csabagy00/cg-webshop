import "./css/Form.css"

const LoginForm = ({submitLogin, setEmail, setPassword, email, password}) => {

  return(
    <div className="form-page">
      <div className="form-wrapper">
        <form onSubmit={submitLogin} className="fields">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
          </div>
          <div className="field-post">
            <input className="field-btn" type="submit" value="Login"/>
          </div>
          <div className="registration-link">
            Don't have an account? <a href="/register">Regsiter</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm