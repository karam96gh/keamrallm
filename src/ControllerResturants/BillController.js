const http = require('http');

const {response, request} = require('express');
const connet = require('../DataBase/DataBaseResturant');


const addBill = async ( req = request, res = response ) => {

    const {resturantId, userId, location,total,listOfProducts} = req.body;

   try {

        const conn = await connet();
        await conn.query(`CALL Add_Bill(?,?,?,?,?);`, [resturantId, userId, location, total ,listOfProducts]);
        
        const url = 'http://ciedco-sms.net/api/sendsms.php';

        const params = {
          username: 'karam1996dev@gmail.com',
          password: '12345karam',
          mno: '963945480000',
          msg: 'resturant tajreeb',
          sid: 'e-mall',
          fl: '0',
          mt: '0',
        };
        console.log('Response:', 'kkk');

        // Construct the URL with query parameters
        const queryParams = new URLSearchParams(params);
        const fullUrl = `${url}?${queryParams.toString()}`;
        
        // Send an HTTP GET request
        http.get(fullUrl, (response) => {
          let data = '';
        
          // Data may be received in chunks, so we concatenate it
          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            console.log('Response:', data);
          });
        });
        conn.end();

        return res.json({
            resp: true,
            message : 'success'
        });

        

   } catch (err) {
    console.log('Response:', err);

        return res.status(500).json({
            resp: false,
            message : err
        });
   }
}




module.exports = {
    addBill
};