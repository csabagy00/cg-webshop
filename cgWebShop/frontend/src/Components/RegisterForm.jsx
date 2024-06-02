

const RegisterForm = ({ setEmail, setUsername, setFirst, setMiddle, setLast, setPhone, setPassword, submitRegister}) => {


  return(
    <form onSubmit={submitRegister}>
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
      <label>Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} required/>
      <label>First name</label>
      <input type="text" onChange={(e) => setFirst(e.target.value)} required/>
      <label>Middle name</label>
      <input type="text" onChange={(e) => setMiddle(e.target.value)} />
      <label>Last name</label>
      <input type="text" onChange={(e) => setLast(e.target.value)} required/>
      <label>Phone</label>
      <input type="tel" onChange={(e) => setPhone(e.target.value)} required/>
      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterForm