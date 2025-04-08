const { Router } = require('express');
const { 
    getAllAds,
   
} = require('../ControllerResturants/ads_contoroller');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/ads/get-ads', validateToken, getAllAds);


  
   


module.exports = router;