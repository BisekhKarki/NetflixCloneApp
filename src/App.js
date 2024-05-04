
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path='/' element={<Login /> } />
      <Route  path='/home' element={<HomePage />} /> 
      </Routes>
     </Router>
    </div>
  );
}

export default App;
