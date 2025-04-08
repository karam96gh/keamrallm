const { response, request } = require('express');
const connet = require('../DataBase/DataBase');



const getOrdersOfUser = async ( req, res = response ) => {

    try {
        const { userId } = req.body;


        const conn = await connet();

        const orders = await conn.query('SELECT * from  bills WHERE userId = ?',[userId]);
        const details = await conn.query('SELECT * FROM billdetails JOIN products on productId=products.id');

        await conn.end();

        res.json({
           "orders":orders[0],
           "details":details[0],

        }
           
        );
        
    } catch (err) {
        
    }
   
}
const changeState = async ( req, res = response ) => {

    try {

        const { id,state } = req.body;
           
        const conn = await connet();

        await conn.query('update bills set state =? where id=?',[state,id]);

        await conn.end();


        return res.status(200).json({
            resp: true,
            message : 'success'
        });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message : 'error'
        });
    }
   
}
const getAllOrderes = async ( req, res = response ) => {

    try {


        const conn = await connet();
        const orders = await conn.query('SELECT bills.*, users.fullName,users.city,users.mobile from bills join users on userId=users.id ');
        const details = await conn.query('SELECT billdetails.* ,products.companyId,products.name ,products.coverImage  FROM billdetails JOIN products on productId=products.id');

        await conn.end();

        res.json({
           "orders":orders[0],
           "details":details[0]
        }
           
        );
        
    } catch (err) {
        
    }
   
}
const getAllOrderesMarket = async ( req, res = response ) => {

    try {


        const conn = await connet();
        const orders = await conn.query('SELECT bills.*, users.fullName,users.city,users.mobile from bills join users on userId=users.id where users.market =1 ');
        const details = await conn.query('SELECT billdetails.* ,products.companyId,products.name ,products.coverImage  FROM billdetails JOIN products on productId=products.id ');

        await conn.end();

        res.json({
           "orders":orders[0],
           "details":details[0]
        }
           
        );
        
    } catch (err) {
        
    }
   
}
module.exports = {
    
    getOrdersOfUser,
    getAllOrderes,
    getAllOrderesMarket,

    changeState
}