// src/components/NavBar.jsx

import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-center gap-4 text-lg">
      <Link
        to="/"
        className={`hover:underline ${location.pathname === '/' ? 'text-red-500 font-bold' : 'text-gray-700'}`}
      >
        Home
      </Link>
      <Link
        to="/favorites"
        className={`hover:underline ${location.pathname === '/favorites' ? 'text-red-500 font-bold' : 'text-gray-700'}`}
      >
        Favorites
      </Link>
      <Link
        to="/compare"
        className={`hover:underline ${location.pathname === '/compare' ? 'text-red-500 font-bold' : 'text-gray-700'}`}
      >
        Compare
      </Link>
    </nav>
  );
};

export default NavBar;
