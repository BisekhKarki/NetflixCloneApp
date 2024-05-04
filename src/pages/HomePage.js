  import React from 'react'
  import "../assets/style/Home.css"


import Horror from './Horror';
import Nav from '../components/Nav';
import Comedies from './Comedies';
import TopRated from './TopRated';
import Action from './Action';

import Home from './Home';

  const HomePage = () => {
    return (
      <>
      <div className='mainPage'>

      
      <Nav />
      <Home />
       <Horror />
      {/* <Comedies />
      <TopRated />
      <Action /> */}
      </div>
      </>
    )
  }

  export default HomePage
