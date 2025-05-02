const TypeFilter = ({ search, onSearch, typeFilter, onTypeChange }) => {
    const types = [
      'fire', 'water', 'grass', 'electric', 'poison', 'flying', 'bug', 'normal', 'ground', 'psychic'
    ]
    return (
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    )
  }
  
  export default TypeFilter