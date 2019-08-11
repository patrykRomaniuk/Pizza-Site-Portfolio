import React,{useContext} from 'react';
import { subtractCount,addCount,deleteItemFromPizzas } from '../actions/auth';
import { connect } from 'react-redux';
import {ModalContext} from './ModalContext';

const PizzaItem = ({ pizza,auth,addCount,deleteItemFromPizzas }) => {
    const [items,setItem] = useContext(ModalContext);
    const deleteItemModal = index => {
        items.splice(index,1);
        const filterItems = items.filter(item => [...item])
        setItem(filterItems);
      }
    return (
      <div className="item-modal" key={pizza._id}>
      <div>
        <p className="item-name">
          {pizza.pizzaName}
        </p>
          </div>
      <form>
          <input 
         type="number" 
         className="count-input"
         onChange={e => {
           if(e.target.value < 1){
             e.target.value = 1;
             return alert("You can't subtract");
           } else {
            addCount(pizza._id,e.target.value);
           }
         }} 
         value={ parseInt(pizza.pizzaCount,10) }/>
      </form>
          <div>
            <p className="item-price">
              { pizza.pizzaPrice }$
            </p>
          </div>

          <div>
            <p className="delete" onClick={() => {
              deleteItemFromPizzas(pizza._id);
              deleteItemModal(pizza._id);
              alert('Item deleted from modal');
              return document.location.reload(true);
            }}>
            <i className="fas fa-times-circle deleteBtn"></i>
            </p>
          </div>
        </div>
    )
}

export default connect(null, { addCount,subtractCount,deleteItemFromPizzas })(PizzaItem);
