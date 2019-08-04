const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../modules/User');
const { check,validationResult } = require('express-validator');

router.post(
    '/',
    [
        check('email','Please Put Valid E-mail').isEmail(),
        check('password','Please Put Valid Password').isLength({ min: 2 })
    ],
    async(req,res) => {
        const errors = validationResult(req);
        const { email,password } = req.body;
        let user = await User.findOne({ email });
        if(!errors.isEmpty())
            return res.status(500).json({ errors: errors.array() });
        if(!user)
            return res.status(404).json({ msg: "User not found" });
        try {
            const isMatch = await bcryptjs.compare(password,user.password);
            if(!isMatch)
                return res.status(401).json({ msg: "Password does not match" });
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ msg: "Server Error..." });
        }
    }
)

module.exports = router;