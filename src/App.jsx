import { Routes, Route } from 'react-router-dom'
import Currency from './pages/Currency';
import Home from './pages/Home';
import Temperature from './pages/Temperature';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/currency' element={<Currency />} />
      <Route path="/temperature" element={<Temperature />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;