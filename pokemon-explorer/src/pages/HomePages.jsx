

import { useState, useMemo } from 'react';
import { usePokemonList } from '../hooks/usePokemonData';
import PokemonCard from '../components/PokemonCard';
import Filters from '../components/TypeFilter';
import './Home.css';

const HomePages = () => {
  const { pokemonList, loading, error } = usePokemonList();
  const [search, setSearch] = useState('');

  const [typeFilters, setTypeFilters] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('id'); 

  const filteredList = useMemo(() => {
    return pokemonList.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilters.length === 0 || typeFilters.some(type => p.types.includes(type));
      return matchesSearch && matchesType;
    });
  }, [pokemonList, search, typeFilters]);
 

  
  const sortedList = useMemo(() => {
    return [...filteredList].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'id':
        default:
          return a.id - b.id;
      }
    });
  }, [filteredList, sortOption]);


  const totalPages = Math.ceil(sortedList.length / itemsPerPage);
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedList.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedList, currentPage, itemsPerPage]);

  return (
    <div className="home-container">
      <h1 className="home-title">Explore Pokémon</h1>

      <Filters
        search={search}
        onSearch={setSearch}
        typeFilters={typeFilters}
        onTypeChange={setTypeFilters}
      />

      <div className="sorting-options">
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="id">ID</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </label>
        <label className='Items-per-pge'> 
          Items per page:
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p className="loading-message">Loading Pokémon...</p>
      ) : error ? (
        <p className="error-message">Error loading data.</p>
      ) : paginatedList.length === 0 ? (
        <p className="no-result-message">No Pokémon found.</p>
      ) : (
        <div className="pokemon-grid">
          {paginatedList.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='span'>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePages;
