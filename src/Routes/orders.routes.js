const { Router } = require('express');
const { 
    getOrdersOfUser,
    getAllOrderes,
    changeState,
    getAllOrderesMarket
    
} = require('../Controller/OrdersController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
   

    router.post('/order/get-orders-of-user', validateToken, getOrdersOfUser);
    router.get('/order/getAllOrderes', validateToken, getAllOrderes);
    router.get('/order/getAllOrderesMarket', validateToken, getAllOrderesMarket);
    
    router.post('/order/changeState', validateToken, changeState);


module.exports = router;