import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import './menuitem/menuitem.css'
import Stripe from './Stripe';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

toast.configure();

const MenuItems = ({ allPizzaPrices,auth }) => {
  if(!auth.isAuthenticated || auth.user.pizzas === []){
    return <Redirect to="/"/>
  }
    return (
        <div className="menu-item-wrapper">
            <div className="price-info">
              <span className="main-price" style={{ color: "#fcfeff", fontSize: "3em" }}>
                Price: { allPizzaPrices }$      
                </span>
              <br/>
              <span className="under-price"
               style={{ color: "#fcfeff", fontSize: "1.5em" }}>
                 
                 Remember, if you want to use payment you have to type
                 </span>
              <br/>
              <span className="under-price"
              style={{ color: "#fcfeff", fontSize: "1.5em" }}>         
                Visa card: 4242 4242 4242    
                </span>
              <br/>
              <span className="under-price"
              style={{ color: "#fcfeff", fontSize: "1.5em" }}>         
                3 letters in CVC like <span style={{ color: 'black' }}>767</span>   
                </span>
              <br/>
              <span className="under-price"
              style={{ color: "#fcfeff", fontSize: "1.4em" }}>         
                MM/YY must begin from 0, type something like 06/24 
                </span>
              <br/>
              <Link to="/">
                <i className="fas fa-home house-icon"></i>
              </Link>
              <br/>
            </div>
             <Stripe />
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    allPizzaPrices: state.auth.allPizzaPrices
});

export default connect(mapStateToProps)(MenuItems);
