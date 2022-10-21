const express = require('express');
const authorization = require('../middleware/authorization');
const Service = require('../models/Service');
const router = express.Router();

// Advertise Service 
router.post('/', authorization, async(req,res)=>{
    const { title, description, pricePerHour, keywords } = req.body;
    try {
        let service =  await Service.findOne({worker_id : req.user_id })
        if(service)
            return res.status(400).json({message: 'You can\'t addvertise more than one service'})

        service = await Service.create({
            worker_id: req.user_id,
            title: title,
            description: description,
            pricePerHour: pricePerHour,
            keywords: keywords
        })

        return res.status(200).json({message: 'Congrats! You advertise yourself'})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Server Error'})
    }
})

// Geting Services
router.get('/', async(req, res)=>{
    try {
        const service = await Service.find({}).populate("worker_id", "username phone email")
        return res.status(200).json(service)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router;