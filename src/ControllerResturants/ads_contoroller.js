const { response, request } = require('express');
const connet = require('../DataBase/DataBaseResturant');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');

const getAllAds = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const ads = await conn.query('SELECT * FROM ads');

        await conn.end();

        res.json(
            ads[0]
        );
        
    } catch (err) {
        
    }
   
}


module.exports = { getAllAds };
