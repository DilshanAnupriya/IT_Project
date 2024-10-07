const SearchBar = ( { searchfunction }) => {
    return (
      <input 
        type="search" 
        placeholder="Search..." 
        onChange={() => {searchfunction()}}
        className="w-full max-w-xs px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none bg-white text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out hover:shadow-lg" 
      />
    )
  }
  
  export default SearchBar;
  