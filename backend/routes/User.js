const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// Creating a user
router.post('/', async(req, res)=>{
    const { username, password, email, phone } = req.body;
    try {
        //check user with this email exist ?
        let user = await User.findOne({email : email});
        if(user)
            return res.status(400).json({message: 'User with this email already exist'})
        // checks username exists already    
        user = await User.findOne({username : username});
        if(user)
            return res.status(400).json({message: 'User with this username already exist'})
        //if not 

        // generate hash for password
        const salt = bcrypt.genSaltSync(10); 
        const bycrptedPass = bcrypt.hashSync(password, salt);
        
        // Create user
        user = await User.create({
            username : username,
            password : bycrptedPass,
            email: email, 
            phone: phone
        })
        
        // Generating Token
        const payload = {
            user : {
                id : user.id
            }
        }
        const token = jwt.sign(data,process.env.JWT_SECERET_KEY);

        res.status(200).json({message: 'Account Created Successfully', token: token})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'})
    }
})

// loging in user
router.post('/login', async(req,res)=>{
    const { username, password } = req.body;
    try {
        // 1 find user by username
        let user = await User.findOne({username: username})
        if(!user){
            // 1.1 if not then check input is email ? 
            user = await User.findOne({email: username})
            if(!user)
                return res.status(400).json({messgae: "Please login with correct credentials"})
        }
        
        // 2 compare pass
        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass)
            return res.status(400).json({messgae: "Please login with correct credentials"})

        // generate token
        const payload = {
            user : {
                id : user.id
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECERET_KEY);
        return res.status(200).json({token: token})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'})
    }
})



module.exports = router;