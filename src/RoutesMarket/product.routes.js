const { Router } = require('express');
const { 

    addProduct,
    deleteProduct,
    changeState,
    updateProduct,
    
    getAllProductss,
} = require('../ControllerMarket/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/market/product/get-all-productss', validateToken, getAllProductss);

    router.post('/market/product/add-product', validateToken,addProduct);
     router.post('/market/product/update-product', validateToken,updateProduct);
    // router.post('/market/product/update-all-price',validateToken, updateAllProduct);

    router.post('/market/product/delete-product', validateToken,deleteProduct);
    
    router.post('/market/product/change-state', validateToken,changeState);



module.exports = router;