import { useNavigate } from 'react-router-dom';

const RandomPokemon = () => {
  const navigate = useNavigate();

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    navigate(`/detail/${randomId}`);
  };

  return (
    <button onClick={handleRandom} className="mt-4 p-2 bg-blue-500 text-white rounded">
      Random Pokémon
    </button>
  );
};

export default RandomPokemon;