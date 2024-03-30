
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
     <Router>
      <Login />
      <Routes>
        <Route  path='/' element={""} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
