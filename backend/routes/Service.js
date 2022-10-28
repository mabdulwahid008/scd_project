const express = require('express');
const authorization = require('../middleware/authorization');
const Service = require('../models/Service');
const router = express.Router();

// Advertise Service 
router.post('/', authorization, async(req,res)=>{
    const { title, description, pricePerHour, keywords, city, area } = req.body;
    try {
        let service =  await Service.findOne({worker_id : req.user_id })
        if(service)
            return res.status(400).json({message: 'You can\'t addvertise more than one service'})

        service = await Service.create({
            worker_id: req.user_id,
            title: title,
            description: description,
            pricePerHour: pricePerHour,
            location : {
                city : city,
                area : area
            },
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
        const service = await Service.find({}).populate("worker_id", "username phone profileIamge")
        return res.status(200).json(service)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Server Error'})
    }
})

// Get Service with the keywords
router.get('/tags', async(req,res)=>{
    const { tag } = req.body;
    try {
        const services = await Service.find({keywords : tag}).populate("worker_id", "username phone profileIamge");
        // console.log(tag);
        res.status(200).send(services)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
})
module.exports = router;