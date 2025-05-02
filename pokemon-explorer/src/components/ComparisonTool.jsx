import React, { useState } from 'react';
import { fetchPokemonDetails } from '../services/pokemonService';

const ComparisonTool = () => {
  const [pokemonOne, setPokemonOne] = useState('');
  const [pokemonTwo, setPokemonTwo] = useState('');
  const [dataOne, setDataOne] = useState(null);
  const [dataTwo, setDataTwo] = useState(null);

  const handleCompare = async () => {
    try {
      const [detailsOne, detailsTwo] = await Promise.all([
        fetchPokemonDetails(pokemonOne.toLowerCase()),
        fetchPokemonDetails(pokemonTwo.toLowerCase()),
      ]);
      setDataOne(detailsOne);
      setDataTwo(detailsTwo);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  return (
    <div className="comparison-tool">
      <input
        type="text"
        placeholder="First Pokémon"
        value={pokemonOne}
        onChange={(e) => setPokemonOne(e.target.value)}
      />
      <input
        type="text"
        placeholder="Second Pokémon"
        value={pokemonTwo}
        onChange={(e) => setPokemonTwo(e.target.value)}
      />
      <button onClick={handleCompare}>Compare</button>

      {dataOne && dataTwo && (
        <div className="comparison-result">
          <div>
            <h3>{dataOne.name}</h3>
            <p>HP: {dataOne.stats.find((stat) => stat.stat.name === 'hp').base_stat}</p>
            <p>Attack: {dataOne.stats.find((stat) => stat.stat.name === 'attack').base_stat}</p>
            {/* Add more stats as needed */}
          </div>
          <div>
            <h3>{dataTwo.name}</h3>
            <p>HP: {dataTwo.stats.find((stat) => stat.stat.name === 'hp').base_stat}</p>
            <p>Attack: {dataTwo.stats.find((stat) => stat.stat.name === 'attack').base_stat}</p>
            {/* Add more stats as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
