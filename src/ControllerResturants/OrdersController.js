const { response, request } = require('express');
const connet = require('../DataBase/DataBaseResturant');
const connect = require('../DataBase/DataBase');
const connectmix = require('../DataBase/DataBaseMix');



const getOrdersOfUser = async ( req, res = response ) => {

    try {
        const { userId } = req.body;


        const conn = await connet();

        const orders = await conn.query('SELECT * from  bills WHERE userId = ?',[userId]);
        const details = await conn.query('SELECT * FROM billdetails JOIN meals on productId=meals.id');

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
        const conna = await connectmix();
          console.log("orders");
        const orders = await conna.query('SELECT resturants.bills.*, emallco.users.fullName,emallco.users.city,emallco.users.mobile from resturants.bills join emallco.users on userId=users.id ');
        const details = await conn.query('SELECT billdetails.* ,meals.*  FROM billdetails JOIN meals on productId=meals.id');
 
        await conn.end();

        res.json({
           "orders":orders[0],
           "details":details[0]
        }
           
        );
        
    } catch (err) {
        console.log(err.body);

    }
   
}

module.exports = {
    
    getOrdersOfUser,
    getAllOrderes,
    changeState
}