import React, { useState, useEffect, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from './PokemonCard'; // Assuming the PokemonCard component is available

const EnhancedListView = () => {
  const { pokemonData } = useContext(PokemonContext); // assuming pokemonData is in context
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // default items per page
  const [sortOption, setSortOption] = useState('id'); // default sort by id
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(pokemonData);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page selection
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on changing items per page
  };

  // Handle sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle filter changes (multiple types)
  const handleFilterChange = (type) => {
    setFilters((prevFilters) =>
      prevFilters.includes(type)
        ? prevFilters.filter((item) => item !== type)
        : [...prevFilters, type]
    );
  };

  // Filter and sort Pokémon
  useEffect(() => {
    let data = pokemonData;

    // Apply filtering by type
    if (filters.length > 0) {
      data = data.filter((pokemon) =>
        filters.every((filter) => pokemon.types.includes(filter))
      );
    }

    // Apply sorting
    if (sortOption === 'id') {
      data.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'name') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'alphabetical') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Set filtered data for pagination
    setFilteredData(data);
  }, [pokemonData, filters, sortOption]);

  // Paginate the filtered data
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="enhanced-list-view">
      {/* Sorting Options */}
      <div className="sorting-options">
        <label>Sort by: </label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="alphabetical">Alphabetically</option>
        </select>
      </div>

      {/* Filtering by Type */}
      <div className="type-filter">
        <h4>Filter by Types:</h4>
        {['fire', 'water', 'electric', 'grass', 'bug'].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={filters.includes(type)}
              onChange={() => handleFilterChange(type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <label>Items per page: </label>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <div>
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Pokémon Cards */}
      <div className="pokemon-grid">
        {displayedData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default EnhancedListView;
