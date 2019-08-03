const express = require('express');
const router = express.Router();
const { validationResult,check } = require('express-validator');

router.post(
    '/',
    [
        check('name','Pizza name not found').not().isEmpty(),
        check('price','Price not found').not().isEmpty()
    ],
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({ errors: errors.array() });
        }
        try {
            
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ msg: "Server Error" });
        }
    }
);

module.exports = router;