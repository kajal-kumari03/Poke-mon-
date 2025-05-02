

import { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch your Pokémon list here
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then(res => res.json())
      .then(data => {
        const list = data.results.map((p, index) => ({
          id: index + 1,
          name: p.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          types: ['normal'], // Update as needed
        }));
        setPokemonList(list);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <PokemonContext.Provider value={{ pokemonList, favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};
