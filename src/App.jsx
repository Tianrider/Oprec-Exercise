import { Routes, Route } from 'react-router-dom'
import Currency from './pages/Currency';
import Home from './pages/Home';
import Temperature from './pages/Temperature';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/currency' element={<Currency />} />
      <Route path="/temperature" element={<Temperature />} />
    </Routes>
  );
}

export default App;