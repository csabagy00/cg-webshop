import { useState } from 'react'
import './css/Admin.css'
import CategoryForm from './CategoryForm'
import ProductForm from './ProductForm';
import RemoveCategory from './RemoveCategory';
import RemoveProduct from './RemoveProduct';
import Modal from './Modal';
import AddAdmin from './AddAdmin';

const Admin = () => {
  const [showAdmin, setShowAdmin] = useState();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return(
    <div className='admin-container'>
      <div className='admin-options'>
        <button onClick={() => setShowAdmin("addProduct")}>Add New Product</button>
        <button onClick={() => setShowAdmin("addCategory")}>Add New Category</button>
        <button onClick={() => setShowAdmin("removeProduct")}>Remove Product</button>
        <button onClick={() => setShowAdmin("removeCategory")}>Remove Category</button>
        <button onClick={() => setShowAdmin("addAdmin")}>Add an Admin account</button>
      </div>
      {showAdmin === "addCategory" ? 
        <CategoryForm />
      : showAdmin === "addProduct" ?
        <ProductForm />
      : showAdmin === "removeCategory" ?
        <>
        <RemoveCategory setShowCategoryModal={setShowCategoryModal}/>
        <Modal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
           <h2>Cannot delete category because there are products in this category</h2>
        </Modal> 
        </>
      : showAdmin === "removeProduct" ?
        <RemoveProduct/>   
      : showAdmin === "addAdmin" ?
        <AddAdmin />
      :
        <></>
      }
    </div>
  )
}

export default Admin