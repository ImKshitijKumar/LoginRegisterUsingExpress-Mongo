const express = require('express');
const router = express.Router();;
const User = require('../models/register');
// const bcryptjs = require('bcryptjs');

//register a user
router.post('/api/post/user', async (req, res) => {
    const { firstname, lastname, email, contact, password} = req.body;
    const name = {firstname, lastname};
    const tasklist = [];
    try {
        const userData = new User({
            name,
            email,
            contact,
            password,
            tasklist
        })
        const token = await userData.generateAuthToken();
        const result = await userData.save();

        res.status(201).send('Registered Successfully' + result);
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;