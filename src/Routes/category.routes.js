const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllCategories ,getSubCategories,addCategory,addSubCategory} = require('../Controller/category_controller');

const router = Router();

router.get('/category/get-all-categories', validateToken,getAllCategories);
router.get('/category/get-sub-categories', validateToken,getSubCategories);
router.post('/category/addCategory', validateToken,addCategory);
router.post('/category/addSubCategory', validateToken,addSubCategory);



module.exports = router;
