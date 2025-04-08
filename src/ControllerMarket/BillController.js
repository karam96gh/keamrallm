const http = require('http');

const {response, request} = require('express');
const connet = require('../DataBase/DataBaseMarket');

function sendOtpRequest(phoneNumber, otp, hostname = 'localhost', port = 5000, path = '/send-otp') {
  // تنسيق رقم الهاتف
  if (phoneNumber.startsWith('9') && phoneNumber.length < 10) {
      phoneNumber = '963' + phoneNumber;
  } else if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1);
  }

  // بيانات الطلب بصيغة JSON
  const data = JSON.stringify({ phoneNumber, otp });

  // إعدادات الطلب
  const options = {
      hostname,
      port,
      path,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
      }
  };

  // إنشاء الطلب
  const req = http.request(options, (res) => {
      let responseData = '';

      // استقبال البيانات
      res.on('data', (chunk) => {
          responseData += chunk;
      });

      // عند انتهاء الطلب
      res.on('end', () => {
          console.log(`Response (${res.statusCode}):`, responseData);
      });
  });

  // التعامل مع الأخطاء
  req.on('error', (e) => {
      console.error('Request Error:', e.message);
  });

  // إرسال البيانات
  req.write(data);
  req.end();
}
const addBill = async ( req = request, res = response ) => {

    const { userId, location,total,listOfProducts} = req.body;
    console.log('hiii1');

   try {
       console.log('hiii1');

        const conn = await connet();
        await conn.query(`CALL Add_Bill(?,?,?,?);`, [ userId, location, total ,listOfProducts]);
        
        const url = 'http://ciedco-sms.net/api/sendsms.php';

        const params = {
          username: 'karam96gh@gmail.com',
          password: '522122emall',
          mno: '963945480000',
          msg: 'new order from super market',
          sid: 'e-mall',
          fl: '0',
          mt: '0',
        };
        console.log('Response:', 'kkk');
        sendOtpRequest('945480000','الماركت يوجد طلبية جديدة');

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
        console.log('hiii3');

        return res.json({
            resp: true,
            message : 'success'
        });

        

   } catch (err) {
    console.log('Response:', err);
    console.log('hiii2');

        return res.status(500).json({
            resp: false,
            message : err
        });
   }
}




module.exports = {
    addBill
};