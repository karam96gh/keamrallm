const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');
const connectmix = require('../DataBase/DataBaseMix');
const http = require('http');

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

const getOrdersOfUser = async ( req, res = response ) => {

    try {
        const { userId } = req.body;


        const conn = await connet();

        const orders = await conn.query('SELECT *,id*1996 as showId from  bills WHERE userId = ? order by id desc',[userId]);
        const details = await conn.query('SELECT * FROM billdetails');

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
const setDelivery = async ( req, res = response ) => {

    try {

        const { id,deliveryId } = req.body;
           
        const conn = await connet();

        await conn.query('update bills set deliveryId =? where id=?',[deliveryId,id]);
        const mobile = await conn.query('SELECT mobile FROM delivery where id=?',[deliveryId]);
        sendOtpRequest(mobile[0][0].mobile.substring(1),' يوجد طلبية توصيل جديدة');

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
        const orders = await conna.query('SELECT market.bills.*, emallco.users.fullName,emallco.users.city,emallco.users.mobile,market.bills.id*1996 as showId from market.bills join emallco.users on userId=users.id ');
        const details = await conn.query('SELECT * FROM billdetails');
 
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
const deleteItem = async ( req, res = response ) => {

    try {

        const { id } = req.body;
           
        const conn = await connet();

        await conn.query('delete from billdetails where id=?',[id]);

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

module.exports = {
    
    getOrdersOfUser,
    getAllOrderes,
    changeState,
    deleteItem,
    setDelivery
}