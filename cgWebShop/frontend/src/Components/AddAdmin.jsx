import { useState } from 'react'
import './css/AddAdmin.css'
import RegisterForm from './RegisterForm'

const AddAdmin = () => {
  const [show, setShow] = useState("registerAdmin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")

  const submitRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/Auth/RegisterAdmin", {
        method: 'POST',
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
      }else{
        console.log("AddAdmin!!!");
      }

    } catch (error) {
      console.error(error)
    }
  }



  return(
    <div className="addAdmin-container">
      <div className="addAdmin-top">
        <button className='addAdmin-top-left' onClick={() => setShow("registerAdmin")}>Register Admin Account</button>
        <button className='addAdmin-top-right' onClick={() => setShow("makeAdmin")}>add admin test</button>
      </div>
      <div className="addAdmin-bottom">
        {show == "registerAdmin" ? 
         <RegisterForm setEmail={setEmail} setUsername={setUsername} setFirst={setFirst} setMiddle={setMiddle} setLast={setLast} setPhone={setPhone} setPassword={setPassword} submitRegister={submitRegister}/> :
         <p>TEST</p>
         }
      </div>
    </div>
  )
}

export default AddAdmin