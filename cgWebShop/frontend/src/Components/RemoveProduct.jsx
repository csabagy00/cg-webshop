import { useContext } from "react"
import { Context } from "../App"

const RemoveProduct = () => {

  const { products, categories, setProductsRefresh, productsRefresh } = useContext(Context)

  function getCategoryName(id){
    return categories.filter(c => c.id === id)[0].name
  }

  const deleteProduct = async (id) => {
    try {

      await fetch(`/api/Products?id=${id}`, {
        method: 'DELETE'
      })

      setProductsRefresh(!productsRefresh)

    } catch (error) {
      console.error(error)
    }
  }

  return(
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>In Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products && products.map((p) => {
          return (
            <tr>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{getCategoryName(p.category.id)}</td>
              <td>{p.price}</td>
              <td>{p.inStock}</td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>Remove</button>
              </td>
          </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RemoveProduct