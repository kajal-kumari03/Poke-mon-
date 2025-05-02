

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const isFavorite = pokemon?.id && favorites?.includes(pokemon.id);

  return (
    <div className={`pokemon-card ${isFavorite ? 'favorite-border' : ''}`}>
      {/* Pokémon Image */}
      {pokemon?.sprite && (
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="pokemon-image"
        />
      )}

      {/* Name and ID */}
      {/* <h2 className="pokemon-name">{pokemon?.name || 'Unknown Pokemon'}</h2>
      <p className="pokemon-id">ID: {pokemon?.id || 'N/A'}</p> */}

<h2 className="pokemon-nam">{pokemon?.name || 'Unknown Pokemon'}</h2>
      <p className="pokemon-id">ID: {pokemon?.id || 'N/A'}</p>

      {/* Type Badges */}
      <div className="pokemon-types">
        {pokemon?.types?.map((type) => (
          <span key={type} className={`type-badge ${type}`}>
            {type}
          </span>
        ))}
      </div>

     
      {/* Abilities */}
      {pokemon?.abilities?.length > 0 && (
        <div className="pokemon-abilities">
          <h4>Abilities</h4>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="pokemon-actions">
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        >
          {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
        </button>

        <Link to={`/detail/${pokemon.id}`} className="view-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
