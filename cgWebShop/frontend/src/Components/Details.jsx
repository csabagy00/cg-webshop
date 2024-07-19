import { useState } from "react"
import { resolvePath } from "react-router-dom";

const Details = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState();
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();

  const submitChange = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/AppUser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id: user.id,
          email: email ? email : "",
          first: first ? first : "",
          middle: middle ? middle : "",
          last: last ? last : "",
          username: username ? username : "",
          phone: phone ? phone : ""
        })
      })

      if(response.ok){
        setEmail()
        setFirst()
        setMiddle()
        setLast()
        setUsername()
        setPhone()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <div className="acc-page">
      <div className="acc-info">
        { edit ?
          <>
            <form onSubmit={submitChange}>
              <div className="acc-detail">
                <label>Email:</label>
                <input className='acc-input' type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={user.email}/>
              </div>
              <div className="acc-detail">
                <label>First:</label>
                <input className='acc-input' type="text" onChange={(e) => setFirst(e.target.value)} value={first} placeholder={user.first}/>
                <label>Middle:</label>
                <input className='acc-input' type="text" onChange={(e) => setMiddle(e.target.value)} value={middle} placeholder={user.middle}/>
                <label>Last:</label>
                <input className='acc-input' type="text" onChange={(e) => setLast(e.target.value)} value={last} placeholder={user.last}/>
              </div>
              <div className="acc-detail">
                <label>Username:</label>
                <input className='acc-input' type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder={user.username}/>
              </div>
              <div className="acc-detail">
                <label>Phone:</label>
                <input className='acc-input' type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder={user.phone}/>
              </div>
              <button className='btn' type="submit">Save</button>
            </form>
          </>
          :
          <>
            <div className="acc-detail">
              <label>Email:</label>
              <p className='acc-value'>{user.email}</p>
            </div>
            <div className="acc-detail">
              <label>Full name:</label>
              <p className='acc-value'>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</p>
            </div>
            <div className="acc-detail">
              <label>Username:</label>
              <p className='acc-value'>{user.username}</p>
            </div>
            <div className="acc-detail">
              <label>Phone:</label>
              <p className='acc-value'>{user.phone}</p>
            </div>
            <button className='btn' onClick={() => setEdit(true)}>Edit</button>
          </>
        }
      </div>
    </div>
  )
}

export default Details