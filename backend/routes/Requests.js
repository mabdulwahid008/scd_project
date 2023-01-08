const express = require('express')
const authorization = require('../middleware/authorization');
const Request = require('../models/Request');
const router = express.Router()


router.post('/',authorization, async(req, res)=>{
    const { title, description } = req.body;
    try {
        await Request.create({
            reuestedAccountId: req.user_id,
            request : {
                title: title,
                description: description
            }
        })
        return res.status(200).json({message: 'Request Added Successfully'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

router.get('/', authorization, async(req, res)=>{
    try {
        console.log(req.user_id);
        const request = await Request.find({}).populate("reuestedAccountId", "username")
        // const requests = request.filter((req)=> {console.log(req.reuestedAccountId._id.equals(req.user_id))})
        return res.status(200).json(request)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

router.patch('/', authorization, async(req, res)=>{
    const { message, _id } = req.body;
    try {
        const request = await Request.findOne({_id: _id})
        // have to work 

        return res.status(200).json({message: 'Message Sent'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router