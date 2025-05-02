// src/services/pokemonService.js
import {
    fetchPokemonList as apiFetchPokemonList,
    fetchPokemonDetails,
    fetchPokemonById,
    fetchTypes,
  } from './api';
  
  export const fetchPokemonList = async (limit = 150, offset = 0) => {
    const data = await apiFetchPokemonList(limit, offset);
    return data.results.map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url
    }));
  };
  