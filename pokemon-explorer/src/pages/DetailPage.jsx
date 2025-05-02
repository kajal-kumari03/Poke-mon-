// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const DetailPage = () => {
//   const { id } = useParams();
//   const [pokemon, setPokemon] = useState(null);
//   const [species, setSpecies] = useState(null);
//   const [evolutionChain, setEvolutionChain] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//         setPokemon(res.data);

//         const speciesRes = await axios.get(res.data.species.url);
//         setSpecies(speciesRes.data);

//         const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
//         const evoChain = [];
//         let evoData = evoRes.data.chain;

//         do {
//           const evoDetails = evoData['evolution_details'][0];
//           evoChain.push({
//             species_name: evoData.species.name,
//             min_level: evoDetails ? evoDetails.min_level : null,
//             trigger_name: evoDetails ? evoDetails.trigger.name : null,
//             item: evoDetails ? evoDetails.item : null,
//           });

//           evoData = evoData['evolves_to'][0];
//         } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

//         setEvolutionChain(evoChain);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPokemonData();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading data.</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl capitalize">{pokemon.name}</h1>
//       <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//       <p>ID: {pokemon.id}</p>
//       <div>
//         <h2 className="text-xl mt-4">Types</h2>
//         <ul>
//           {pokemon.types.map((type) => (
//             <li key={type.type.name}>{type.type.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className="text-xl mt-4">Stats</h2>
//         <ul>
//           {pokemon.stats.map((stat) => (
//             <li key={stat.stat.name}>
//               {stat.stat.name}: {stat.base_stat}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className="text-xl mt-4">Abilities</h2>
//         <ul>
//           {pokemon.abilities.map((ability) => (
//             <li key={ability.ability.name}>{ability.ability.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className="text-xl mt-4">Moves</h2>
//         <ul>
//           {pokemon.moves.slice(0, 10).map((move) => (
//             <li key={move.move.name}>{move.move.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className="text-xl mt-4">Evolution Chain</h2>
//         <ul>
//           {evolutionChain.map((evo, index) => (
//             <li key={index}>
//               {evo.species_name}
//               {evo.min_level && ` (Level ${evo.min_level})`}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;

































import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./DetailPage.css"

const DetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);

        const speciesRes = await axios.get(res.data.species.url);
        setSpecies(speciesRes.data);

        const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
        const evoChain = [];
        let evoData = evoRes.data.chain;

        do {
          const evoDetails = evoData['evolution_details'][0];
          evoChain.push({
            species_name: evoData.species.name,
            min_level: evoDetails ? evoDetails.min_level : null,
            trigger_name: evoDetails ? evoDetails.trigger.name : null,
            item: evoDetails ? evoDetails.item : null,
          });

          evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        setEvolutionChain(evoChain);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error loading data.</p>;

  return (
    <div >
    <div className='main'>
      <div className="detail-container"> 
      <h1 className="detail-title capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
      <p>ID: {pokemon.id}</p>
      <div>
        <h2 className="section-title">Types</h2>
        <ul className="detail-list">
          {pokemon.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="section-title">Status</h2>
        <ul className="detail-list">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        </div>
      </div>
      </div>
      </div>
  );
};

export default DetailPage;