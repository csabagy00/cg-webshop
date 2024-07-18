import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../App'

const CategoryForm = () => {
  const [nameValue, setNameValue] = useState("")

  const { setCategoriesRefresh, categoriesRefresh } = useContext(Context);

  const submitCategory = async (e) => {
    e.preventDefault()

    try {
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
        console.log("!!!")
        setNameValue("")
        setCategoriesRefresh(!categoriesRefresh)
      }else{
        console.log("???");
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
    </div>
  )
}

export default CategoryForm