const { response, request } = require('express');
const connet = require('../DataBase/DataBase');
const io = require('../app');
const getAllCategories = async ( req = request, res = response ) => {
    try {

        const conn = await connet();

        const categories = await conn.query('SELECT * FROM categories where id !=50 order by proirity');
        console.log("categories");
        await conn.end();
        return res.json(categories[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const getSubCategories = async ( req = request, res = response ) => {
    try {

        const conn = await connet();

        const categories = await conn.query('SELECT * FROM subcategories');
        console.log("ssscategories");

        await conn.end();
        return res.json(categories[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}

const addCategory = async ( req = request, res = response ) => {
    try {
        const { name, image ,pass} = req.body;
        console.log(req.body);
       
          if(pass=='1234'||pass=='202320242025')
          {
            const conn = await connet();
         await conn.query('INSERT INTO categories ( name, image) VALUES (?,?);',[name, image]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          }
          else{
            return res.status(200).json({
                resp: true,
                message: 'success'
            }); 
          }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}
const addSubCategory = async ( req = request, res = response ) => {
    try {
        const { name, categoryId ,pass} = req.body;
        console.log(req.body);
       
          if(pass=='1133557799'||pass=='202320242025')
          {
            const conn = await connet();
         await conn.query('INSERT INTO subcategories ( name, categoryId) VALUES (?,?);',[name, categoryId]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          }
          else{
            return res.status(200).json({
                resp: true,
                message: 'success'
            }); 
          }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: 'hiiii'
        });
    }

}
module.exports = {
    getAllCategories,getSubCategories,addCategory,addSubCategory
}