import { useState, useContext } from "react"
import { Context } from "../App"
import { useNavigate } from "react-router-dom"
import LoginForm from "../Components/LoginForm"
import Modal from "../Components/Modal"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invalidLogin, setInvalidLogin] = useState(false)
  const navigate = useNavigate();

  const { setIsAuthenticated, setIsAdmin, setCart, setCartCounter } = useContext(Context)

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
        const cartResp = await fetch(`/api/Cart?userId=${result.id}`)

        if(cartResp.ok){
          const cartResult = await cartResp.json();
          setCart(cartResult.cartItems)
          setCartCounter(cartResult.cartItems.length)
          
        }else{
          console.log("failed to get cart");
        }

        localStorage.setItem("token", result.token)
        localStorage.setItem("user", JSON.stringify(result))

        setIsAuthenticated(true)

        setEmail("")
        setPassword("")

        if(result.role === "Admin"){
          setIsAdmin(true)
        }
        
        navigate('/')

      } else {
        setInvalidLogin(true)

      }
    } catch (error) {
      console.error("Error submiting:"), error
    }
  }

  return(
    <div>
      <LoginForm submitLogin={submitLogin} setEmail={setEmail} setPassword={setPassword} email={email} password={password}/>
      <Modal isOpen={invalidLogin} onClose={() => setInvalidLogin(false)}>
        <p>Incorrect email or password!</p>
      </Modal>
    </div>
  )
}

export default Login