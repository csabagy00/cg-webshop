import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../Components/LoginForm"

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
  
      if(response.ok){
        const result = await response.json()
        localStorage.setItem("token", result.token)
        localStorage.setItem("user", JSON.stringify(result))

        setIsAuthenticated(true)

        setEmail("")
        setPassword("")

        if(result.role === "Admin"){
          setIsAdmin(true)
        }
        
        navigate('/')

        console.log(localStorage.getItem("token"))
        console.log(JSON.parse(localStorage.getItem("user")))
      }
    } catch (error) {
      console.error("Error submiting:"), error
    }
  }

  return(
    <div>
      <LoginForm submitLogin={submitLogin} setEmail={setEmail} setPassword={setPassword} email={email} password={password}/>
    </div>
  )
}

export default Login