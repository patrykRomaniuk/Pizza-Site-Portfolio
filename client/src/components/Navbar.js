import React from 'react';
import { connect } from 'react-redux';
import './navbarcss/navbar.css';
import { logOut } from '../actions/auth';
import { Link } from 'react-router-dom';
import { setModal } from '../actions/auth';

function Navbar({ logOut,setModal,auth,login,register }) {
  return (
    <nav className="nav-wrapper">
      <div className="logo">
        <Link to="/" 
        style={{ color: '#000', textDecoration: 'none' }}>
          DREAM 
          <br/> 
          PIZZA
        </Link>
      </div>
      <div></div>
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
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.auth.modal
});

export default connect(mapStateToProps, { logOut,setModal })(Navbar);