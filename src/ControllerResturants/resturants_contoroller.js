const { response, request } = require('express');
const connet = require('../DataBase/DataBaseResturant');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');

const getAllResturants = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const resturants = await conn.query('SELECT * FROM resturants');

        await conn.end();

        res.json(
            resturants[0]
        );
        
    } catch (err) {
        
    }
   
}
const addResturant = async ( req = request, res = response ) => {
    try {
        const { password,name, image, delivery, description, hours, location, cover ,mobile} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('INSERT INTO resturants (password, name, image, delivery, description, hours, location, cover ,mobile) VALUES (?,?,?,?,?,?,?,?,?);',[password,name, image, delivery, description, hours, location, cover ,mobile]);
         

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
const login = async ( req = request, res = response ) => {
    try {
        const { mobile, password} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
            const existsUser = await conn.query('SELECT * FROM resturants WHERE mobile=? and password=?',[mobile,password]);
         
            if( existsUser[0].length === 0 ){
                await  conn.end();
                return res.status(400).json({
                    resp: false,
                    message : 'Wrong info'
                });
            }
            else{
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success',
                id:existsUser[0][0].id,

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
module.exports = { getAllResturants ,addResturant,login};
