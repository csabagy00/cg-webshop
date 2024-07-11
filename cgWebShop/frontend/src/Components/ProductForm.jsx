import { useEffect, useState } from 'react'

const ProductForm = () => {
  const [categories, setCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [name, setName] = useState()
  const [inStock, setInStock] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/Category')

      if(response.ok){
        const result = await response.json()
        setCategories(result)
      }
    }

    fetchData()
  }, [])

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
    <div>
      <div>
        <form onSubmit={submitProduct}>
          <div>
            <label>Name</label>
            <input type='text' onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div>
            <label>In Stock</label>
            <input type='text' onChange={(e) => setInStock(e.target.value)} required/>
          </div>
          <div>
            <label>Price</label>
            <input type='text' onChange={(e) => setPrice(e.target.value)} required/>
          </div>
          <div>
            <label>Image</label>
            <input type='text' onChange={(e) => setImage(e.target.value)}/>
          </div>
          <div>
            <label>Category</label>
            <select name="category" onChange={(e) => handleChange(e)} required>
              <option value="" >Select</option>
              {categories && categories.map((c) => 
              (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm