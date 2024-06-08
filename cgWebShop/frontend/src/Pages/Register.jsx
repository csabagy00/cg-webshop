import { useState } from "react"
import RegisterForm from "../Components/RegisterForm"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [first, setFirst] = useState("")
  const [middle, setMiddle] = useState("")
  const [last, setLast] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")


  const submitRegister = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/Auth/Register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          first: first,
          middle: middle,
          last: last,
          phone: phone
        })
      })

      if(response.ok){
        const result = await response.json()
        setEmail("")
        setUsername("")
        setFirst("")
        setMiddle("")
        setLast("")
        setPhone("")
        setPassword("")
        console.log(result);
      }

    } catch (error) {
      console.error("Error submitting registration form", error)
    }
  }


  return(
    <>
      <RegisterForm setEmail={setEmail} setUsername={setUsername} setFirst={setFirst} setMiddle={setMiddle} setLast={setLast} setPhone={setPhone} setPassword={setPassword} submitRegister={submitRegister}/>
    </>
  )
}

export default Register