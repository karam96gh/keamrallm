const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllCategories ,getSubCategories,addCategory,addSubCategory,updateCategory,updateSubCategory,deleteCategory,deleteSubCategory} = require('../ControllerMarket/category_controller');

const router = Router();

router.get('/market/category/get-all-categories', validateToken,getAllCategories);
router.get('/market/category/get-sub-categories', validateToken,getSubCategories);
router.post('/market/category/addCategory', validateToken,addCategory);
router.post('/market/category/addSubCategory', validateToken,addSubCategory);

router.post('/market/category/updateCategory', validateToken,updateCategory);
router.post('/market/category/updateSubCategory', validateToken,updateSubCategory);
router.post('/market/category/deleteCategory', validateToken,deleteCategory);
router.post('/market/category/deleteSubCategory', validateToken,deleteSubCategory);

module.exports = router;
