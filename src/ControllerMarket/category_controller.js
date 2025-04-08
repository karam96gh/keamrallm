const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');
const io = require('../app');
const getAllCategories = async ( req = request, res = response ) => {
    try {

        const conn = await connet();

        const categories = await conn.query('SELECT * FROM categories order by sorted');
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
        const { name, image } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('INSERT INTO categories ( name, logo) VALUES (?,?);',[name, image]);
          
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
        const {id, name, image } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('update categories set name=?,logo=? where id=?',[name, image,id]);
          
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
const addSubCategory = async ( req = request, res = response ) => {
    try {
        const { name, categoryId } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('INSERT INTO subcategories ( name, categoryId) VALUES (?,?);',[name, categoryId]);
          
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
const updateSubCategory = async ( req = request, res = response ) => {
    try {
        const { name, id } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('update subcategories set name =? where id =?',[name, id]);
          
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
const deleteSubCategory = async ( req = request, res = response ) => {
    try {
        const {  id } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('delete from subcategories  where id =?',[ id]);
          
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
        const {id } = req.body;
        console.log(req.body);
       
         
            const conn = await connet();
         await conn.query('delete from categories  where id=?',[id]);
          
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
module.exports = {
    getAllCategories,getSubCategories,addCategory,addSubCategory,updateCategory,updateSubCategory,deleteCategory,deleteSubCategory
}