import wegetarianska from './herocss/wegetarianska.jpeg';
import szynka from './recipes/szynka.jpeg'
import salami from './recipes/salami.jpeg'
import peperoni from './recipes/peperoni.jpg'
import capriciosa from './recipes/capriciosa.jpg'
import cola from './recipes/cola.jpg'
import fanta from './recipes/fanta.jpg'
import pepsi from './recipes/pepsi.jpg'
import sprite from './recipes/sprite.jpg'
import tomatosauce from './recipes/tomatosauce.jpg'
import garlicsauce from './recipes/garlicsauce.jpg'
import ketchup from './recipes/ketchup.jpg'
 
export const PizzaRecipe = [
    {
        pizza: [
            {
                id: 1,
                name: 'Gangstera',
                price: '15$',
                priceNum: 15,
                img: wegetarianska,
                isDisabled: false
            },
            {
                id: 2,
                name: 'Capriciosa',
                price: '10$',
                priceNum: 10,
                img: capriciosa,
                isDisabled: false
            },
            {
                id: 3,
                name: 'Pepperoni',
                price: '18$',
                priceNum: 18,
                img: peperoni,
                isDisabled: false
            },
            {
                id: 4,
                name: 'Ham',
                price: '25$',
                priceNum: 25,
                img: szynka,
                isDisabled: false
            },
            {
                id: 5,
                name: 'Salami',
                price: '14$',
                priceNum: 14,
                img: salami,
                isDisabled: false
            }
        ],
        sauces: [
            {
                id:6,
                name: 'Ketchup',
                price: '1$',
                priceNum: 1,
                img: ketchup,
                isDisabled: false
            },
            {
                id:7,
                name: 'Garlic Sauce',
                price: '1$',
                priceNum: 1,
                img: garlicsauce,
                isDisabled: false
            },
            {
                id:8,
                name: 'Tomato Sauce',
                price: '1$',
                priceNum: 1,
                img: tomatosauce,
                isDisabled: false
            }
        ],
        drinks: [
            {
                id: 9,
                name: 'Coca Cola',
                price: '2$',
                priceNum: 2,
                img: cola,
                isDisabled: false
            },
            {
                id: 10,
                name: 'Sprite',
                price: '2.3$',
                priceNum: 2.3,
                img: sprite,
                isDisabled: false    
            },
            {
                id: 11,
                name: 'Fanta',
                price: '0.75$',
                priceNum: 0.75,
                img: fanta,
                isDisabled: false 
            },
            {
                id: 12,
                name: 'Pepsi',
                price: '2$',
                priceNum: 2,
                img: pepsi,
                isDisabled: true
            }
        ]
    }
]