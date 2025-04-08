const http = require('http');

const {response, request} = require('express');
const connet = require('../DataBase/DataBase');


const addBill = async ( req = request, res = response ) => {

    const { userId, location,total,listOfProducts} = req.body;

   try {

        const conn = await connet();
        await conn.query(`CALL Add_Bill(?,?,?,?);`, [ userId, location, total ,listOfProducts]);
        
        const url = 'http://ciedco-sms.net/api/sendsms.php';

        const params = {
          username: 'karam96gh@gmail.com',
          password: '522122emall',
          mno: '963945480000',
          msg: 'يوجد طلبية جديدة',
          sid: 'e -maLL',
          fl: '0',
          mt: '0',
        };
        console.log('Response:', 'kkk');
        sendOtpRequest('945480000','يوجد طلبية جديدة');
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

 function sendOtpRequest(phoneNumber, otp, hostname = 'localhost', port = 5000, path = '/send-otp') {
    if(phoneNumber[0]==9 && phoneNumber.length<10)
      phoneNumber='963'+phoneNumber;
    if(phoneNumber[0]=='0')
      phoneNumber=phoneNumber.substring(1);
    // Data to send in JSON format
    const data = JSON.stringify({
      phoneNumber,
      otp
    });
  
    // Set up the HTTP request options
    const options = {
      hostname,
      port,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
  
    // Send the request
    const req = http.request(options, (res) => {
      let responseData = '';
  
      res.on('data', (chunk) => {
        responseData += chunk;
      });
  
      res.on('end', () => {
        console.log('Response:', responseData);
      });
    });
  
    // Handle any errors with the request
    req.on('error', (e) => {
      console.error('Problem with request:', e.message);
    });
  
    // Write the data to the request body
    req.write(data);
    req.end();
  }


module.exports = {
    addBill
};