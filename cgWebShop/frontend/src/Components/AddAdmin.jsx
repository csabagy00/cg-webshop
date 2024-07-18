import { useState } from 'react'
import './css/AddAdmin.css'
import RegisterForm from './RegisterForm'
import Modal from './Modal';

const AddAdmin = () => {
  const [show, setShow] = useState("registerAdmin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")

  const [showModal, setShowModal] = useState(false)

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
        StatesToBaseValue();
        console.log(result);
      }else{
        console.log("AddAdmin!!!");
      }

    } catch (error) {
      console.error(error)
    }
  }

  const submitEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/Role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(`${email}`)
      })

      if(response.ok){
        StatesToBaseValue();
      }

    } catch (error) {
      console.error(error)
    }
  }


  function StatesToBaseValue(){
    setEmail("")
    setUsername("")
    setFirst("")
    setMiddle("")
    setLast("")
    setPhone("")
    setPassword("")
  }



  return(
    <div className="addAdmin-container">
      <div className="addAdmin-top">
        <button className='addAdmin-top-left' onClick={() => setShow("registerAdmin")}>Register Admin Account</button>
        <button className='addAdmin-top-right' onClick={() => setShow("makeAdmin")}>Change role to Admin</button>
      </div>
      <div className="addAdmin-bottom">
        {show == "registerAdmin" ? 
         <RegisterForm setEmail={setEmail} setUsername={setUsername} setFirst={setFirst} setMiddle={setMiddle} setLast={setLast} setPhone={setPhone} setPassword={setPassword} submitRegister={submitRegister}/> 
         :
         <div className='form-page'>
          <div className='form-wrapper'>
            <form onSubmit={submitEmail}>
              <div className='field'>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              </div>
              <div className='field-post'>
                <input className="field-btn" value="Change Role" onClick={() => setShowModal(true)}/>
              </div>
              {showModal ? 
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <div>
                    <h2>Are you sure you want to add Admin role to {email}?</h2>
                    <button type='submit'>Change</button>
                  </div>
                </Modal> 
                :
                <></>
              }
            </form>
          </div>
         </div>
         }
      </div>

    </div>
  )
}

export default AddAdmin