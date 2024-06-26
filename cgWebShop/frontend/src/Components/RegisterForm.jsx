import "./css/Form.css"

const RegisterForm = ({ setEmail, setUsername, setFirst, setMiddle, setLast, setPhone, setPassword, submitRegister}) => {


  return(
    <div className="form-page">
      <div className="form-wrapper">
        <form onSubmit={submitRegister} className="fields">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="field">
            <label htmlFor="first">First name</label>
            <input type="text" onChange={(e) => setFirst(e.target.value)} required/>
          </div>
          <div className="field">
            <label htmlFor="middle">Middle name</label>
            <input type="text" onChange={(e) => setMiddle(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="last">Last name</label>
            <input type="text" onChange={(e) => setLast(e.target.value)} required/>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input type="tel" onChange={(e) => setPhone(e.target.value)} required/>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className="field-post">
            <input type="submit" value="Register"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm