import { useContext } from "react"
import { Context } from "../App"

const RemoveCategory = ({ setShowCategoryModal }) => {

const { categories, products, setCategoriesRefresh, categoriesRefresh } = useContext(Context);

function calculateTotal(id){
  return products.filter(p => p.category.id === id).length
}

const deleteCategory = async (id) => {
  try {
    const response = await fetch(`/api/Category?id=${id}`, {
      method: 'DELETE'
    })

    if(!response.ok){
      console.log("didn't delete");
      setShowCategoryModal(true)
    }else{
      setCategoriesRefresh(!categoriesRefresh)
    
    }

  } catch (error) {
    console.error(error)
  }
}

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Total product</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories && categories.map((c) => {
          return (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{calculateTotal(c.id)}</td>
              <td>
                <button onClick={() => deleteCategory(c.id)}>Remove</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RemoveCategory