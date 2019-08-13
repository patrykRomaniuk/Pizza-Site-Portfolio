const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const bcryptjs = require('bcryptjs');
const Pizza = require('../modules/Pizza');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const uuid = require('uuid');
const stripe = require('stripe')('sk_test_0HYNOmPXMUaMYDpOyPccKyIo00QDMu2FKy');
const { check,validationResult } = require('express-validator');

router.post(
    '/',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Please Put Valid E-mail').isEmail(),
        check('password','Password Should have at least 2 letters').isLength({ min: 2 })
    ],
    async(req,res) => {
        const { name,email,password } = req.body;
        const errors = validationResult(req);
        let validateEmail = await User.findOne({ email });
        let validateUserName = await User.findOne({ name });
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        
        if(validateEmail)
            return res.status(401).json({ msg: "There is already user with that e-mail" })
        
        if(validateUserName) 
            return res.status(401).json({ msg: 'There is already user with that nmae' });
        try {
            const user = new User({
                name,
                email,
                password
            });
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password,salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err,token) => {
                    if(err) throw err;
                    res.json({ token })
                }
            );
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { allPizzaPrices, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
      const idempotency_key = uuid.v4();
      const charge = await stripe.charges.create(
        {
          amount: allPizzaPrices * 1,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the Items`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });

router.put(
    '/',
    [
        check('name','Pizza name not found').not().isEmpty(),
        check('price','Price not found').not().isEmpty(),
        check('count',"Count is required").not().isEmpty(),
        check('startingPrice',"StartingPrice is required").not().isEmpty()
    ],
    auth,
    async(req,res) => {
        const { name,price,count,startingPrice } = req.body;
        let user = await User.findById(req.user.id);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({ errors: errors.array() });
        }
        try {
            let pizzaName = await Pizza.findOne({ name });
            if(pizzaName){
                return res.status(401).json({ msg: "There is pizza like that,just change the count." });
            }
            if(user.pizzas.length > 5){
                return res.status(500).json({ msg: "Max is only 5 items" });
            }
            const pizzaItem = {
                pizzaName: name,
                pizzaPrice: price,
                pizzaCount: count,
                priceStart: startingPrice
            };
            user.pizzas.unshift(pizzaItem)

            await user.save();
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ msg: "Server Error" });
        }
    }
);

router.put(
    '/add/:pizza_id/:count',
    auth,
    async(req,res) => {
        try {
            let user = await User.findById(req.user.id).select('-password');
            let checkForID = user.pizzas
            .find(pizza => pizza._id.toString() === req.params.pizza_id.toString()); 
            let parseCountStringToInt = parseInt(checkForID.pizzaCount,10);
            parseCountStringToInt = 1;
            const actualCount = parseCountStringToInt * req.params.count;
            checkForID.pizzaPrice = req.params.count * checkForID.priceStart;
            checkForID.pizzaCount = actualCount;
            await user.save();
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/me',
    auth,
    async(req,res) => {
        try {
            let user = await User.findById(req.user.id).select('-password');
            if(!user)
                return res.status(404).json({ msg: "User Not Found" });
            res.json(user);    
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/',
    async(req,res) => {
        try {
            let users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.delete(
    '/:id',
    auth,
    async(req,res) => {
        try {
            let user = await User.findById(req.user.id);
            const removeItemFromPizzas = user.pizzas
            .filter(pizza => pizza.id !== req.params.id);
            user.pizzas = removeItemFromPizzas;
            await user.save();
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

module.exports = router;