import React,{ useState } from 'react';
import Hero from './components/Hero.js'
import Recipes from './components/Recipes.js'
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Landing = () => {
  const [modal,setModal] = useState(true);
    return (
        <div className="main-image">
        <Navbar modal={modal} setModal={ setModal }/>
          <Hero/>
          <div className="phone-num-wrapper">
          <span className="phone-num">Phone Number:<br/> +48 221 564 725</span>
          </div>
          <Recipes/>
        <Footer/>
      </div>
    )
}

export default Landing;
