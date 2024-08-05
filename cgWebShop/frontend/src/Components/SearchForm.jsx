
const SearchForm = ({ setSearchValue, filteredProducts, setFilteredProducts, products}) => {

  const handleSearch = (e) => {
    e.preventDefault();

    let searchInput = document.getElementById('searchV').value ? document.getElementById('searchV').value.toLowerCase() : null;

    if(searchInput == null){
      setFilteredProducts(null)
    }

    setSearchValue(searchInput)

    filteredProducts != null ? 
      filteredProducts.filter(p => p.name.toLowerCase().includes(searchInput))
    :
    setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(searchInput)))

  }

  return(
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input type='text' id='searchV'placeholder="Search..."/>
        <button className="search-btn" type='submit' >&#x1F50D;</button>
      </form>
    </div>
  )
}


export default SearchForm