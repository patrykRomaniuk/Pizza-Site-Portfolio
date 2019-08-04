const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
)

module.exports = router;