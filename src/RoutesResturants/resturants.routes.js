const { Router } = require('express');
const { 
    getAllResturants,
    addResturant,
    login,
   
} = require('../ControllerResturants/resturants_contoroller');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/resturants/get-resturants', validateToken, getAllResturants);
    router.post('/resturants/add-resturant', validateToken, addResturant);
    router.post('/resturants/login', validateToken, login);


  
   


module.exports = router;