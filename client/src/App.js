import React from 'react'
import './components/css/App.css'
import Navbar from './components/Navbar.js'
import Hero from './components/Hero.js'
import Recipes from './components/Recipes.js'
import Footer from './components/Footer';
import {ModalProvider} from './components/ModalContext'

export default function App() {
  return (
       <div className="main-image">
        <ModalProvider>
          <Navbar/>
            <Hero/>
            <div className="phone-num-wrapper">
            <span className="phone-num">Phone Number:<br/> +48 221 564 725</span>
            </div>
            <Recipes/>
          <Footer/>
        </ModalProvider>
       </div>
  )
}

