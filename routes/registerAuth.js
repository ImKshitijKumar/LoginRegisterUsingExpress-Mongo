const express = require('express');
const router = express.Router();
const User = require('../models/register')
const bcryptjs = require('bcryptjs')

//register a user
router.post('/api/post/user', async (req, res) => {
    const { firstname, lastname, email, contact, password: plainTextPass } = req.body
    const name = {firstname, lastname}
    const password = await bcryptjs.hash(plainTextPass, 10)
    try {
        const result = await User.create({
            name,
            email,
            contact,
            password
        })
        res.status(201).send('Registered Successfully')
    } catch (error) {
        res.status(400).send(error);
    }
})


// get all registered users
// router.get('/api/get/users', async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// })

module.exports = router;