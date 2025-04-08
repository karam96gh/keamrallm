const { response, request } = require('express');
const connet = require('../DataBase/DataBaseResturant');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');

const getMeals = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const meals = await conn.query('SELECT * FROM meals');

        await conn.end();

        res.json(
            meals[0]
        );
        
    } catch (err) {
        
    }
   
}

const addMeal = async ( req = request, res = response ) => {
    try {
        const { name, resturantId ,categoryId,subId,details,priceFuser,coverImage} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('INSERT INTO meals ( name, resturantId ,categoryId,subId,details,priceFuser,coverImage) VALUES (?,?,?,?,?,?,?);',[name, resturantId ,categoryId,subId,details,priceFuser,coverImage]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          
         
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}
const updateMeal = async ( req = request, res = response ) => {
    try {
        const { id,name, resturantId ,categoryId,subId,details,priceFuser,coverImage,tags} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('UPDATE meals SET categoryId=?,resturantId=?,name=?,coverImage=?,priceFuser=?,state=0,details=?,tags=?,subId=? WHERE id=?',[categoryId, resturantId ,name,coverImage,priceFuser,details,tags,subId,id]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          
         
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}
const deleteMeal = async ( req = request, res = response ) => {
    try {
        const { id} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('delete from meals where id=?',[id]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          
         
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}
module.exports = { getMeals,addMeal,updateMeal,deleteMeal };
