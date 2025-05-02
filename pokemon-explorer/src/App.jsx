import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePages from './pages/HomePages';
import DetailPage from './pages/DetailPage';
import FavoritePage from './pages/FavoritePage';
import Compare from './pages/Compare';
import { PokemonProvider } from './context/PokemonContext';
import NavBar from './components/NavBar'; // ✅ import navbar
import './App.css'; // ✅ import styles

function App() {
  return (
    <PokemonProvider>
      <Router>
       
        <NavBar />

        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
      </Router>
    </PokemonProvider>
  );
}

export default App;
