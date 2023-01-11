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
        const request = await Request.find({}).populate("reuestedAccountId", "username")
        return res.status(200).json(request)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

router.get('/myrequests', authorization, async(req, res)=>{
    try {
        const request = await Request.find({}).populate("worker_id", "username")
        return res.status(200).json(request)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

router.patch('/', authorization, async(req, res)=>{
    const { bid, req_id, worker_id } = req.body;
    try {
        const request = await Request.findOne({_id: req_id})
        
        request.message = bid;
        request.worker_id = worker_id;
        await request.save();
        

        return res.status(200).json({message: 'Message Sent'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router