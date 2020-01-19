import React,{ useEffect, useState } from 'react';
import { removeModal,loadUser } from './actions/auth';
import Modal from './components/Modal';
import { connect } from 'react-redux';

const ModalWrapper = ({ removeModal,loadUser,modal,auth: { allPizzaPrices, user }, stripeToken = "pk_test_elTAJLmc7MrVyq0HbMo8SRog00jr18CTIy" }) => {
  
  let [stripe,setStripe] = useState(null);

  useEffect(() => {
    loadUser();
    if(window.Stripe) setStripe(window.Stripe(stripeToken));
  },[]);

  const sendDataToStripe = () => {
    stripe.redirectToCheckout({
      items: user.pizzas(item => ({
        sku: item.sku,
        quantity: item.pizzaCount
      })),
      successUrl: 'http://localhost:3000/',
      cancelUrl: 'http://localhost:3000/',
    })
    .then(function (result) {
      if (result.error) {
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  }
  
  return (
        <div className="modal-wrapper" style={{ display: modal === true ? 'flex' : 'none'}}>
        <div className="modal-header">
        <p className="basket">Basket</p>
        <p className="closeModal"  onClick={() => removeModal()}>
          <i className="fas fa-window-close closeBtn" style={{ zIndex: '2' }}>
          </i>
        </p> 
      </div>
      <div className="basket-modal">
        <div className="main-modal"> 
          <Modal/>
        </div>
        <div className="btn-modal-wrapper">
            <button className="btn-modal" onClick={() => sendDataToStripe()}>
              Buy { allPizzaPrices }$
            </button>
        </div>
      </div>
      </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.auth.modal
});

export default connect(mapStateToProps, { removeModal,loadUser })(ModalWrapper);
