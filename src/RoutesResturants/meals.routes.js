const { Router } = require('express');
const { 
    getMeals,addMeal,updateMeal,deleteMeal 
} = require('../ControllerResturants/meals_contoroller');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsProduct } = require('../Helpers/Multer');

const router = Router();

  
    router.get('/meals/get-all-meals', validateToken, getMeals);


  
    router.post('/meals/add-meal', validateToken,addMeal);
    router.post('/meals/update-meal', validateToken,updateMeal);
    router.post('/meals/delete-meal', validateToken,deleteMeal);

   


module.exports = router;