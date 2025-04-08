const { Router } = require('express');
const { 
    getOrdersOfUser,
    getAllOrderes,
    changeState
    
} = require('../ControllerResturants/OrdersController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
   

    router.post('/order-resturants/get-orders-of-user', validateToken, getOrdersOfUser);
    router.get('/order-resturants/getAllOrderes', getAllOrderes);
    
    router.post('/order-resturants/changeState', validateToken, changeState);


module.exports = router;