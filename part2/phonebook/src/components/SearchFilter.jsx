const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <div>
        Filter shown with:
        <input
          placeholder="Search"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  )
}

export default SearchFilter