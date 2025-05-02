import { useState, useEffect } from 'react';
import axios from 'axios';
import './compare.css'

const Compare = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [firstData, setFirstData] = useState(null);
  const [secondData, setSecondData] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      setPokemonList(res.data.results);
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (firstPokemon) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${firstPokemon}`);
        setFirstData(res.data);
      }
      if (secondPokemon) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${secondPokemon}`);
        setSecondData(res.data);
      }
    };

    fetchData();
  }, [firstPokemon, secondPokemon]);

  return (
    <div className="p">
      <h1 className="text">Compare Pokémon</h1>
      <div className="flex gap-4 mt-4">
        <select onChange={(e) => setFirstPokemon(e.target.value)} defaultValue="">
          <option value="" disabled className='first-pok'>
            Select First Pokémon
          </option>
          {pokemonList.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSecondPokemon(e.target.value)} defaultValue="">
          <option value="" disabled className='second-pok'>
            Select Second Pokémon
          </option>
          {pokemonList.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="box">
        {firstData && (
          <div>
            <h2 className="text-xl capitalize">{firstData.name}</h2>
            <img src={firstData.sprites.front_default} alt={firstData.name} />
            <ul>
              {firstData.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
        {secondData && (
          <div>
            <h2 className="text-xl capitalize">{secondData.name}</h2>
            <img src={secondData.sprites.front_default} alt={secondData.name} />
            <ul>
              {secondData.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;


