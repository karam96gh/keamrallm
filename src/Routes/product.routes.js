const { Router } = require('express');
const { 
    getProductImage,
    getAllProducts,
    addProduct,
    getMostBuyProducts,
    updateProduct,updateAllProduct,
    deleteProduct,
    changeState,
    AupdateProduct,
    increment,
    changeTrust,
    getAllProductsios,
    getAllProductss,
    getAllProductsMarket,
    changeStar
} = require('../Controller/ProductController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/product/get-all-products', validateToken, getAllProducts);
    router.get('/product/get-all-productss', validateToken, getAllProductss);
    router.get('/product/get-all-productsss', validateToken, getAllProductsios);


    router.get('/product/get-all-products-market', validateToken, getAllProductsMarket);

    router.get('/product/get-all-product',  getAllProducts);

    router.get('/product/get-all-products-most-buy', validateToken, getMostBuyProducts);
    router.post('/product/get-product-images', validateToken, getProductImage);
    router.post('/product/add-product', validateToken,addProduct);
    router.post('/product/update-product', validateToken,updateProduct);
    router.post('/product/update-all-price',validateToken, updateAllProduct);
    router.post('/product/increment',validateToken, increment);

    router.post('/product/delete-product', validateToken,deleteProduct);
    router.post('/product/Adelete-product', validateToken,deleteProduct);
    
    router.post('/product/change-state', validateToken,changeState);
    router.post('/product/change-trust', validateToken,changeTrust);
    router.post('/product/change-star', validateToken,changeStar);

    router.post('/product/Aupdate-product', validateToken,AupdateProduct);


module.exports = router;