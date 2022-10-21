const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (req, res, next)=>{
    try {
        const token = req.header('token')

        if(!token)
            return res.status(400).json({message: 'You are not authorized'})

        const user = jwt.verify(token, process.env.JWT_SECERET_KEY);
        req.user_id = user.user.id;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'})
    }
}

module.exports = authorization;