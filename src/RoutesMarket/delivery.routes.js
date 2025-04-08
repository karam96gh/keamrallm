const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const {getAllDeliveries,addDelivery,login,updateLocation,getDeliveryById} = require('../ControllerMarket/delivery_controller');

const router = Router();

router.get('/delivery/get-all-deliveries', validateToken,getAllDeliveries);
router.post('/delivery/addDelivery', validateToken,addDelivery);
router.post('/delivery/login', validateToken,login);

router.post('/delivery/updateLocation', validateToken,updateLocation);

router.post('/delivery/getDeliveryById', validateToken,getDeliveryById);

module.exports = router;
