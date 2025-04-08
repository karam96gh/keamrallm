const { Router } = require('express');
const { 
    getAllCategories,
    deleteCategory, 
    addCategory,
    updateCategory
} = require('../ControllerResturants/categories_contoroller');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/categories/get-main-category', validateToken, getAllCategories);


  
    router.post('/categories/add-main-category', validateToken,addCategory);
    router.post('/categories/update-main-category', validateToken,updateCategory);
    router.post('/categories/delete-main-category', validateToken,deleteCategory);

   


module.exports = router;