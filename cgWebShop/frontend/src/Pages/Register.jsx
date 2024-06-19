import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../Components/RegisterForm"
import Modal from "../Components/Modal"

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [first, setFirst] = useState("")
  const [middle, setMiddle] = useState("")
  const [last, setLast] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [invalidReg, setInvalidReg] = useState(false)


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
        navigate("/")
        console.log(result);
      }else{
        setInvalidReg(true)
      }

    } catch (error) {
      console.error("Error submitting registration form", error)
    }
  }


  return(
    <>
      <RegisterForm setEmail={setEmail} setUsername={setUsername} setFirst={setFirst} setMiddle={setMiddle} setLast={setLast} setPhone={setPhone} setPassword={setPassword} submitRegister={submitRegister}/>
      <Modal isOpen={invalidReg} onClose={() => setInvalidReg(false)}>
        <p>Invalid registration data</p>
      </Modal>
    </>
  )
}

export default Register