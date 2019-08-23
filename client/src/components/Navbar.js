import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import './navbarcss/navbar.css';
import { logOut } from '../actions/auth';
import { Link } from 'react-router-dom';
import { setModal } from '../actions/auth';

function Navbar({ logOut,setModal,auth,modal,login,register }) {
  const [changeNavbar,setChangeNavbar] = useState(false);

  let scrollNavbar = () => {
    let scrollNumber = document.documentElement.scrollTop;
    if(scrollNumber === 0) setChangeNavbar(false);
    else setChangeNavbar(true);
  }

  useEffect(() => {
    document.addEventListener('scroll',scrollNavbar);
  },[])

  const arrowTop = () => window.scrollTo(0,0);
  const scrollToDrinks = () => window.scrollTo(0,3200);
  const scrollToPizza = () => window.scrollTo(0,1100);
  const scrollToSauces = () => window.scrollTo(0,2100);

  return (
    <nav className="nav-wrapper" style={{ backgroundColor: '#4cb7f9' }}>
      <div className="logo">
        <Link to="/" 
        style={{ color: '#000', textDecoration: 'none' }}>
          DREAM 
          <br/> 
          PIZZA
        </Link>
      </div>
      <div className="nav-links">
        <div 
        className="nav-link" 
        onClick={scrollToPizza} 
        style={{ 
          display: login === "login" || register === "register"
          ? 'none' : 'flex',
          color: 'rgb(243, 235, 235)' }}>
          Pizza
        </div>

        <div 
        className="nav-link" 
        onClick={scrollToDrinks} 
        style={{ 
          display: login === "login" || register === "register"
          ? 'none' : 'flex',
          color: 'rgb(243, 235, 235)'
        }}>
          Drinks
        </div>
        <div 
        className="nav-link"
        onClick={scrollToSauces} 
        style={{ 
          display: login === "login" || register === "register"
          ? 'none' : 'flex',
          color: 'rgb(243, 235, 235)' }}>
            Sauces
        </div>
      
      </div>
      <div className="basket">
        <i className="fas fa-shopping-cart basket-icon" 
        style={{
          display: login === "login" || register === "register" || !auth.isAuthenticated
          ? 'none' : 'flex'
        }}
        onClick={() => {
          if(auth.user.pizzas === null){
            return alert('There is not items in modal, you have to pick something');
          } else if(!auth.isAuthenticated){
            return alert('You are not registered yet');
          } else {
            setModal();
          }
        }}></i>
        <span style={{ display: auth.isAuthenticated || login === "login" ? 'none' : 'block'}}>
          <Link to="/login">Login</Link>
        </span>
        <span style={{ display: auth.isAuthenticated || register === "register" ? 'none': "block" }}>
          <Link to="/register">Register</Link>
        </span>
        {
          auth.isAuthenticated 
          && ( <br/> )
        }
        <span onClick={logOut} style={{ display: !auth.isAuthenticated ? 'none' : 'block' }}>
          <Link to="/">
            Log Out
          </Link>
        </span>
      </div>
      <div className="backToTop" onClick={arrowTop} style={{ display: changeNavbar ? 'block' : 'none'}}>
      <i className="fas fa-chevron-circle-up"></i>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.auth.modal
});

export default connect(mapStateToProps, { logOut,setModal })(Navbar);