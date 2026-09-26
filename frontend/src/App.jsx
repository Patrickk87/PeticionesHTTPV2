import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<div className="container"><h1>Bienvenido al Taller de Comunicar Backend + Frontend + BD</h1></div>} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </Router>
  );
}

export default App;