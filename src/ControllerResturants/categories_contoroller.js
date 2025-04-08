const { response, request } = require('express');
const connet = require('../DataBase/DataBaseResturant');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');

const getAllCategories = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const categories = await conn.query('SELECT * FROM categories');

        await conn.end();

        res.json(
            categories[0]
        );
        
    } catch (err) {
        
    }
   
}

const addCategory = async ( req = request, res = response ) => {
    try {
        const { name} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('INSERT INTO categories ( name) VALUES (?);',[name])
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
const updateCategory = async ( req = request, res = response ) => {
    try {
        const { id,name} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('UPDATE categories SET name=? WHERE id=?',[name, id ]);
          
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
const deleteCategory = async ( req = request, res = response ) => {
    try {
        const { id} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('delete from categories where id=?',[id]);
          
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
module.exports = { getAllCategories,addCategory,updateCategory,deleteCategory };
