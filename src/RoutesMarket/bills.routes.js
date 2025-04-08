const { Router } = require('express');
const { 
  
    addBill
} = require('../ControllerMarket/BillController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  

    router.post('/market/bill/add-bill', validateToken, addBill);


module.exports = router;