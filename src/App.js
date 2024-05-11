
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import MyList from './components/MyList';
import TvShows from './components/TvShows';
import Movies from './components/Movies';
import NewAndPopular from './components/NewAndPopular';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path='/' element={<Login /> } />
      <Route  path='/home' element={<HomePage />} /> 
      <Route path='/list' element={<MyList />}  />
      <Route path='/shows' element={<TvShows />}  />
      <Route path='/movies' element={<Movies />}  />
      <Route path='/new' element={<NewAndPopular />}  />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
