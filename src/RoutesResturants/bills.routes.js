const { Router } = require('express');
const { 
  
    addBill
} = require('../ControllerResturants/BillController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  

    router.post('/resturant-bill/add-bill', validateToken, addBill);


module.exports = router;