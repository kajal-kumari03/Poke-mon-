import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 150, offset = 0) => {
  const res = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return res.data;
};

export const fetchPokemonDetails = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const fetchPokemonById = async (id) => {
  const res = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return res.data;
};

export const fetchTypes = async () => {
  const res = await axios.get(`${BASE_URL}/type`);
  return res.data.results.map((type) => type.name);
};

