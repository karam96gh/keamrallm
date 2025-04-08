const { Router } = require('express');
const { 
    getAllCategories,
    deleteCategory, 
    addCategory,
    updateCategory
} = require('../ControllerResturants/sub_categories_contoroller');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/sub-categories/get-sub-category', validateToken, getAllCategories);


  
    router.post('/sub-categories/add-sub-category', validateToken,addCategory);
    router.post('/sub-categories/update-sub-category', validateToken,updateCategory);
    router.post('/sub-categories/delete-sub-category', validateToken,deleteCategory);

   


module.exports = router;