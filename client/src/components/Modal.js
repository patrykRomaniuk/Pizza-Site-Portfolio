import React from 'react'
import { connect } from 'react-redux';
import './modal/modal.css'
import PizzaItem from './PizzaItem';
import { removeModal } from '../actions/auth';

//Looping through the "pizzas" and passing the data to PizzaItem component (also checking the value)

const Modal = ({ auth }) => 
  auth.isAuthenticated && 
  auth.user !== null && 
  auth.user.pizzas.length >= 0 && 
  auth.user.pizzas.map(pizza => (
    <PizzaItem pizza={pizza} key={ pizza._id }/>
))

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.auth.modal
});

export default connect(mapStateToProps,{ removeModal })(Modal);