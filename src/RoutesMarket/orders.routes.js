const { Router } = require('express');
const { 
    getOrdersOfUser,
    getAllOrderes,
    changeState,
    deleteItem,
    setDelivery
    
} = require('../ControllerMarket/OrdersController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
   

    router.post('/market/order/get-orders-of-user', validateToken, getOrdersOfUser);
    router.get('/market/order/getAllOrderes', validateToken, getAllOrderes);
    
    router.post('/market/order/changeState', validateToken, changeState);
    router.post('/market/order/setDelivery', validateToken, setDelivery);

    router.post('/market/order/deleteItem', validateToken, deleteItem);


module.exports = router;