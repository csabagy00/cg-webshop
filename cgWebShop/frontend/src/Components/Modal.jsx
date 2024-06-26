import "./css/Modal.css"

const Modal = ({ children, onClose, isOpen }) => {

  return (isOpen &&
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-message">
            {children}
          </div>
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal