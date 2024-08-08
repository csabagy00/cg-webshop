
const ImagePopup = ({ src, isOpen, onClose }) => {

  return( isOpen && 
    <div className="img-modal">
      <span className="close" onClick={onClose}>&times;</span>
      <img className="clicked-img" src={src}/>
    </div>
  )
}

export default ImagePopup