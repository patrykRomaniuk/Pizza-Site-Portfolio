import React,{useContext,useEffect} from 'react';
import { subtractCount,addCount,deleteItemFromPizzas,setAllPizzaPrices } from '../actions/auth';
import { connect } from 'react-redux';
import {ModalContext} from './ModalContext';

const PizzaItem = ({ pizza,auth,addCount,deleteItemFromPizzas,setAllPizzaPrices }) => {
  const [items,setItem] = useContext(ModalContext);
  const deleteItemModal = index => {
      items.splice(index,1);
      const filterItems = items.filter(item => [...item])
      setItem(filterItems);
  }      
  const sumAllPrices = auth.user.pizzas
  .map(item => parseInt(item.pizzaPrice,10))
  .reduce((a,b) => a + b,0);
      useEffect(() => {
        setAllPizzaPrices(sumAllPrices)
      },[sumAllPrices])
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
              setTimeout(() => document.location.reload(true),1000);
              alert('Item deleted from modal');
            }}>
                <i className="fas fa-times-circle deleteBtn"></i>
            </p>
          </div>
        </div>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { 
  addCount,
  subtractCount,
  deleteItemFromPizzas,
  setAllPizzaPrices
})(PizzaItem);
