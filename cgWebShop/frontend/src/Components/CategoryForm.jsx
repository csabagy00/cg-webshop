import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../App'
import Modal from './Modal'

const CategoryForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [correct, setCorrect] = useState(true);

  const { setCategoriesRefresh, categoriesRefresh } = useContext(Context);

  const submitCategory = async (e) => {
    e.preventDefault();

    const hasSpaceOrNonAlphabetic = /[^a-zA-Z]/;

    try {
      if(!hasSpaceOrNonAlphabetic.test(nameValue)){

        const response = await fetch('/api/Category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: nameValue
          })
        })
  
        if(response.ok){
          setCategoriesRefresh(!categoriesRefresh)
          setShowModal(true)
        }

      }else{
        setCorrect(false)
        setShowModal(true)
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <form onSubmit={submitCategory} className="fields">
          <div className="field">
            <label>Category Name</label>
            <input type="text" onChange={(e) => setNameValue(e.target.value)} value={nameValue}/>
          </div>
          <div className="field-post">
            <input className="field-btn" type="submit" value="Add"/>
          </div>
        </form>
      </div>
      <Modal isOpen={showModal} onClose={() => {setShowModal(false)
        setNameValue("")
      }}>
        { correct ? 
          <h3>Successfully added {nameValue} </h3>
          :
          <h3>The Category name must not contain non alphabetic characters!</h3>
        }
      </Modal>
    </div>
  )
}

export default CategoryForm