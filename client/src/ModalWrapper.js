import React from 'react';
import { Link } from 'react-router-dom';
import { removeModal } from './actions/auth';
import Modal from './components/Modal';
import { connect } from 'react-redux';

const ModalWrapper = ({ removeModal,modal,auth: { allPizzaPrices } }) => {
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
            <button className="btn-modal">
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

export default connect(mapStateToProps, { removeModal })(ModalWrapper);
