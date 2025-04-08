const { Router } = require('express');
const { 
  
    addBill
} = require('../Controller/BillController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  

    router.post('/bill/add_bill', validateToken, addBill);


module.exports = router;