const express = require('express');
const router = express.Router();
const User = require('../models/register')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_KEY = "1@Aj$32dhwdy%LFw42d*kjad*^d&bwka%94FTu79kf#lmJD"

router.put('/api/user/:id', async (req, res) => {
    const {token} = req.body

    try {
        const user = jwt.verify(token, JWT_KEY)
        const _id = user.id

        const newdata = await User.findByIdAndUpdate({ _id }, { $set: {
            
        }})
    } catch (error) {
        
    }
})