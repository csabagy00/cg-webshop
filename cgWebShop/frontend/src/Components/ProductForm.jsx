import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../App'


const ProductForm = () => {
  const [selectedCategory, setSelectedCategory] = useState()
  const [name, setName] = useState()
  const [inStock, setInStock] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState(null)

  const { categories } = useContext(Context);

  const handleChange = (e) => {
    const id = parseInt(e.target.value)

    for(var cat of categories){
      if(cat.id === id){
        setSelectedCategory(cat)
      }
    }
  }

  const submitProduct = async (e) => {
    e.preventDefault()

    const productObj = {
      id: 0,
      category: selectedCategory,
      name: name,
      inStock: inStock,
      price: price,
      img: image
    }

    try {

      console.log(productObj);

      const response = await fetch('/api/Products', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(productObj)
      })

      const result = await response.json()

      if(response.ok){
        console.log("!!!");
        console.log(result);
      }else{
        console.log("???");
      }

    } catch (error) {
      console.error(error)
    }
  }

  return(
    <div className='form-page'>
      <div className='form-wrapper'>
        <form onSubmit={submitProduct} className='fields'>
          <div className='field'>
            <label>Name</label>
            <input type='text' onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className='field'>
            <label>In Stock</label>
            <input type='text' onChange={(e) => setInStock(e.target.value)} required/>
          </div>
          <div className='field'>
            <label>Price</label>
            <input type='text' onChange={(e) => setPrice(e.target.value)} required/>
          </div>
          <div className='field'>
            <label>Image</label>
            <input type='text' onChange={(e) => setImage(e.target.value)}/>
          </div>
          <div className='field'>
            <label>Category</label>
            <select id='category-select' name="category" onChange={(e) => handleChange(e)} required>
              <option value="" >Select</option>
              {categories && categories.map((c) => 
              (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input className='field-post' type='submit' value='Submit' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm