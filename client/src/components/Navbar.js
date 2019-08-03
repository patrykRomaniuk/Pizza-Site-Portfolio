import React,{useContext,useEffect,useState} from 'react'
import {ModalContext} from './ModalContext'
import './navbarcss/navbar.css'
import Modal from './Modal';

export default function Navbar() {
  const [modalItems,setModalItems] = useContext(ModalContext);
  const [changeNavbar,setChangeNavbar] = useState(false);
  const [modal,setModal] = useState(true);
  let scrollNavbar = () => {
    let scrollNumber = document.documentElement.scrollTop;
    if(scrollNumber === 0) setChangeNavbar(false);
    else setChangeNavbar(true);
  }
  useEffect(() => {
    document.addEventListener('scroll',scrollNavbar);
  },[setModal])
  const arrowTop = () => window.scrollTo(0,0);
  const scrollToDrinks = () => window.scrollTo(0,3200);
  const scrollToPizza = () => window.scrollTo(0,1100);
  const scrollToSauces = () => window.scrollTo(0,2100);
  const displayModal = () => setModal(!modal)
  return (
    <nav className="nav-wrapper" style={{ backgroundColor: changeNavbar ? '#4cb7f9' : '' }}>
      <div className="logo">DREAM <br/> PIZZA</div>
      <div className="nav-links">
        <div className="nav-link" onClick={scrollToPizza} style={{ color: changeNavbar ? 'rgb(243, 235, 235)' : '#4cb7f9' }}>Pizza</div>
        <div className="nav-link" onClick={scrollToDrinks} style={{ color: changeNavbar ? 'rgb(243, 235, 235)' : '#4cb7f9' }}>Drinks</div>
        <div className="nav-link" onClick={scrollToSauces} style={{ color: changeNavbar ? 'rgb(243, 235, 235)' : '#4cb7f9' }}>Sauces</div>
      </div>
      <div className="basket">
        <i className="fas fa-shopping-cart basket-icon" onClick={displayModal}></i>
        <div className="modalLength">{modalItems.length}</div>
      </div>
      <Modal modal={modal} setModal={setModal}/>
      <div className="backToTop" onClick={arrowTop} style={{ display: changeNavbar ? 'block' : 'none'}}>
      <i className="fas fa-chevron-circle-up"></i>
      </div>
    </nav>
  )
}
