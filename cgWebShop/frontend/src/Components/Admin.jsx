import { useState } from 'react'
import './css/Admin.css'
import CategoryForm from './CategoryForm'
import ProductForm from './ProductForm';

const Admin = () => {
  const [showAdmin, setShowAdmin] = useState()

  return(
    <div className='admin-container'>
      <div className='admin-options'>
        <button onClick={() => setShowAdmin("addProduct")}>Add New Product</button>
        <button onClick={() => setShowAdmin("addCategory")}>Add New Category</button>
        <button>Remove Product</button>
        <button>Remove Category</button>
        <button>Add an Admin account</button>
      </div>
      {showAdmin === "addCategory" ? 
        <CategoryForm />
      : showAdmin === "addProduct" ?
        <ProductForm />
      :
        <></>
      }
    </div>
  )
}

export default Admin