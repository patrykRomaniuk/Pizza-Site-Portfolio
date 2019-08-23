import React,{useContext} from 'react'
import {ModalContext} from './ModalContext';
import { setPizza } from '../actions/auth';
import './recipes/recipes.css'
import './herocss/hero.css'
import { connect } from 'react-redux';

function Item({ setPizza,item, auth }) {
  const [modalItems,setModalItems] = useContext(ModalContext);
  const addToItems = (name,price,img,priceNum,id) => {
    setModalItems([...modalItems,{name,price,img,count: 1,priceNum,id}])
  }  
  const count = "1";
    let secondPizzaLoop = item.map( (item,index) => {
      return(
            <div className="recipe-item" key={index}>
                  <div className="first-item-div">
                    <p className="item-text name-item">{item.name}</p>
                    <p className="item-text">{item.price}</p>
                  </div>
                  <div className="second-item-div">
                    <img 
                    src={item.img} 
                    alt="" 
                    style={{ 
                      width: '80px', 
                      height:'80px', 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '50%' 
                      }} 
                      />
                       <i className="far fa-plus-square plus" 
                       onClick={()=> {
                         if(!auth.isAuthenticated){
                            return alert('You are not registered')
                         }
                         const filteringForItem = auth.user.pizzas
                         .find(pizza => pizza.pizzaName === item.name)
                          if(filteringForItem !== undefined){
                            return alert('There is already this item');
                          }
                            if(auth.user.pizzas.length >= 4){
                              return alert('Max is 4 items');
                            } else {
                               if(auth.isAuthenticated || !localStorage.token){
                                 addToItems(item.name,item.price,item.img,item.priceNum,item.id);
       
                                 setPizza(
                                   item.name,
                                   item.priceNum,
                                   count,
                                   item.id,
                                   item.priceNum
                                 );
                                 alert('Item added');
                               }                     
                             }       
                          }
                      }>
                       </i>
                  </div>
            </div>
        )
    });
  return (
    <div className="recipe">
      {secondPizzaLoop}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setPizza })(Item);