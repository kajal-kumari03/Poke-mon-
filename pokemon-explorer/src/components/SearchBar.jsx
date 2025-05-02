


const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search Pokémon"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: '0.75rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem',
      width: '100%',
      marginBottom: '1rem',
      boxSizing: 'border-box',
    }}
    onFocus={(e) => {
      e.target.style.outline = 'none';
      e.target.style.borderColor = '#007bff';
      e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = '#ccc';
      e.target.style.boxShadow = 'none';
    }}
  />
);

export default SearchBar;