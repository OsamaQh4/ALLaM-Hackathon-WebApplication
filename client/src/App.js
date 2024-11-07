import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/c/:chatId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
