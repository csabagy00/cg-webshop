

const Details = ({ user }) => {
  return(
    <div className="acc-page">
      <div className="acc-info">
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
        <button className='btn'>Edit</button>
      </div>
      <div className='acc-edit'>

      </div>
    </div>
  )
}

export default Details