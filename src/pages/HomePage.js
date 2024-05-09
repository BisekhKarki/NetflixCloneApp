  import React from 'react'
  import "../assets/style/Home.css"
import Horror from './Horror';
import Nav from '../components/Nav';
import Comedies from './Comedies';
import TopRated from './TopRated';
import Action from './Action';

import Home from './Home';
import SciFi from './SciFi';
import Mystery from './Mystery';
import Animated from './Animated';
import Drama from './Drama';
import Footer from './Footer';

  const HomePage = () => {
    return (
      <>
      <div className='mainPage'>

      
      <Nav />
      <Home />
       <Horror />
       <Comedies />
       <TopRated />
       <Action /> 
       <SciFi />
      <Mystery />
      <Animated />
      <Drama />
      <Footer />
      </div>
      </>
    )
  }

  export default HomePage
