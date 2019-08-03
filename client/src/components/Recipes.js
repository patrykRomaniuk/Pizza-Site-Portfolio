import React from 'react'
import Item from './Item'
import './recipes/recipes.css'
import { PizzaRecipe } from './DataRecipe'

export default function Recipes() {
    let loopThroughtPizzaRecipe = PizzaRecipe.map( (item,index) => {
        return(
            <div className="recipes" key={index}>
                 <Item item={item.pizza}/>
            </div>
        )
    });
    let loopThroughtSauces = PizzaRecipe.map( (item,index) => {
      return(
          <div className="recipes" key={index}>
               <Item item={item.sauces}/>
          </div>
      )
  });
  let loopThroughtDrinks = PizzaRecipe.map( (item,index) => {
    return(
        <div className="recipes" id="drinks" key={index}>
             <Item item={item.drinks}/>
        </div>
    )
});
  return (
    <div className="recipe-wrapper">
    
      <div className="pizza-info-wrapper">
        <span className="pizza-info" style={{ border: '2px solid #4cb7f9',
      width: '80vw',textAlign: 'center' }}>Pizza</span>
           {loopThroughtPizzaRecipe}
      </div>

      <div className="pizza-info-wrapper">
      <span className="pizza-info" style={{ border: '2px solid #4cb7f9',
      width: '80vw',textAlign: 'center' }}>Sauces</span>
      {loopThroughtSauces}
      </div>

      <div className="pizza-info-wrapper">
      <span className="pizza-info" style={{ border: '2px solid #4cb7f9',
      width: '80vw',textAlign: 'center' }}>Drinks</span>
        {loopThroughtDrinks}
      </div>
    </div>
  )
}
