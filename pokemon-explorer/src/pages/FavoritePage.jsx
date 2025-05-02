import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import './FavoritePage.css'

const FavoritePage = () => {
  const { favorites, pokemonList } = useContext(PokemonContext);

  if (!favorites || !pokemonList) return <p>Loading...</p>;

  const favoritePokemons = pokemonList.filter(p => favorites.includes(p.id));

  return (
    <div className='main-box'>
      <h2 className="text">Your Favorites</h2>
      {favoritePokemons.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        <div className="grid">
          {favoritePokemons.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
