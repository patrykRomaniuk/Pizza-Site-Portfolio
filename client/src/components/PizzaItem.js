import React,{useContext,useEffect} from 'react';
import { subtractCount,addCount,deleteItemFromPizzas,sumAllPrices } from '../actions/auth';
import { connect } from 'react-redux';
import {ModalContext} from './ModalContext';

const PizzaItem = ({ pizza,addCount,deleteItemFromPizzas,sumAllPrices }) => {
  const [items,setItem] = useContext(ModalContext);
  const deleteItemModal = index => {
      items.splice(index,1);
      const filterItems = items.filter(item => [...item])
      setItem(filterItems);
  }      
      useEffect(() => {
        sumAllPrices();
      },[])
    return (
      <div className="item-modal" key={pizza._id}>
      <div>
        <p className="item-name">
          {pizza.pizzaName}
        </p>
          </div>
      <form style={{ display: 'flex' }}>

          <i 
          className="fas fa-minus-square count"
          onClick={() => {
            const pizzaCountToInt =  parseInt(pizza.pizzaCount,10);
            if(pizzaCountToInt <= 1){
              return alert("You can't subtract");
            } else {
              addCount(pizza._id,pizzaCountToInt - 1);
            }
          }}></i>

          <p className="deleteBtn item-name"
         style={{
            fontSize: '1.5em',
            margin: '.5em'
         }}>{ pizza.pizzaCount }</p>

          <i className="fas fa-plus-square count"
          onClick={() => {
            const pizzaCountToInt =  parseInt(pizza.pizzaCount,10)
            addCount(pizza._id,pizzaCountToInt + 1);
          }}></i>

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
  sumAllPrices
})(PizzaItem);
