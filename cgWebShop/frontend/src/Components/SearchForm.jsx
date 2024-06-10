
const SearchForm = ({ setSearchValue, filteredProducts, setFilteredProducts, products}) => {

  const handleSearch = (e) => {
    e.preventDefault();

    let searchInput = document.getElementById('searchV').value ? document.getElementById('searchV').value : null;

    if(searchInput == null){
      setFilteredProducts(null)
    }

    setSearchValue(searchInput)

    filteredProducts != null ? 
      filteredProducts.filter(p => p.name.includes(searchInput))
    :
    setFilteredProducts(products.filter(p => p.name.includes(searchInput)))

    console.log(filteredProducts);
  }

  return(
    <form onSubmit={handleSearch}>
      <input type='text' id='searchV'placeholder="Search..."/>
      <button type='submit' >Search</button>
    </form>
  )
}


export default SearchForm