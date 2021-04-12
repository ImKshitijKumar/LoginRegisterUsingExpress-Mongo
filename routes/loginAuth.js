const express = require('express');
const router = express.Router();
const User = require('../models/register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_KEY = "1@Aj$32dhwdy%LFw42d*kjad*^d&bwka%94FTu79kf#lmJD"

//login a user
router.post('/api/login', async (req, res) => {
    const {email, password: plaintextpass} = req.body
    const user = await User.findOne({email})
    try {
        if(!user){
            return res.json({status: "error", msg: "Invalid Email"})
        }
        const isMatch = await bcrypt.compare(plaintextpass, user.password);
        const token = await user.generateAuthToken();
        
        if(isMatch){
            // const token = jwt.sign({
            //     id: user._id,
            //     email: user.email,
            //     role: user.role
            // }, JWT_KEY, {expiresIn: "24h"})
            
            return res.status(201).json({status: 'success', token: token })
        }else{
            return res(400).json({status: "error", msg: "Invalid Password"})
        }
    } catch (error) {
        re.status(400).send(error)
    }

    // const user = await User.findOne({email})
    // if(!user){
    //     return res.json({status: "error", msg: "Invalid Email"})
    // }

    // if(await bcrypt.compare(plaintextpass, user.password)){
    //     const token = jwt.sign({
    //         id: user._id,
    //         email: user.email,
    //         role: user.role
    //     }, JWT_KEY)
    //     return res.json({status: 'success', token: token })
    // }else{
    //     return res.json({status: "error", msg: "Invalid Password"})
    // }
})

module.exports = router