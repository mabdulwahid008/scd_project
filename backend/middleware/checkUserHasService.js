const Service = require('../models/Service')

const checkUserHasService = async(req, res, next)=>{

    try {
        const service = await Service.findOne({worker_id : req.user_id});

        if(!service)
            return res.status(404).json({message: 'You have no service advertised'})
        
        req.service_id = service.id;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Server Error'})
    }
    
    
}

module.exports = checkUserHasService