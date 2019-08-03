import React,{useContext} from 'react'
import {ModalContext} from './ModalContext'
import './recipes/recipes.css'
import './herocss/hero.css'

export default function Item({item}) {
  const [modalItems,setModalItems] = useContext(ModalContext);
  const addToItems = (name,price,img,priceNum,id) => {
    setModalItems([...modalItems,{name,price,img,count: 1,priceNum,id}])
  }  
  
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
                       onClick={()=>addToItems(item.name,item.price,item.img,item.priceNum,item.id)}>
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
