const http = require('http');
const { request, response } = require('express');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcrypt');
const connect = require('../DataBase/DataBase');
const updateUserPassword = async (req = request, res = response) => {
  const { mobile, newPassword } = req.body;

  const salt = bcrypt.genSaltSync();
  const newHashedPassword = bcrypt.hashSync(newPassword, salt);

  const conn = await connect();
  var mobile2;
  if(mobile[0]=='0')
    mobile2=mobile.substring(1);
   else
   mobile2='0'+mobile;
  const hasUser = await conn.query('SELECT mobile FROM users WHERE mobile = ? or mobile=?', [mobile,mobile2]);

  if (hasUser[0].length > 0) {
      await conn.query('UPDATE users SET password = ? WHERE mobile = ? or mobile=?', [newHashedPassword, mobile,mobile2]);

      conn.end();

      return res.json({
          resp: true,
          message: 'Password updated successfully for user with mobile: ' + mobile,
      });
  } else {
      return res.json({
          resp: false,
          message: 'User not found',
      });
  }
};

const addNewUser = async (req = request, res = response) => {
  var code ='';
    const { mobile, fullName, password,city,cityCode } = req.body;
    var mob=mobile;
    if (mob[0] !== '0') {
      mob = '0' + mob;
    }
    if(cityCode==null)
    {
      code='963';
    }
    else{
      code=cityCode;
    }
    
    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync( password, salt );
    console.log(code);

    const conn = await connect();
    var mobile2;
    if(mob[0]=='0')
      mobile2=mob.substring(1);
     else
     mobile2='0'+mob;
    const hasEmail = await conn.query('SELECT * FROM users WHERE mobile=? or mobile=?',[mob,mobile2]);

    if( hasEmail[0].length == 0 ){
        const ver = generateRandom4DigitNumber();

        await conn.query(`CALL SP_REGISTER_USER(?,?,?,?,?);`, [ mob, fullName, pass,city,ver]);
        const mobb=mobile;
        const url = 'http://ciedco-sms.net/api/sendsms.php';

        var i=0;
        if(mobb[0]=='0')
        {
          i=1;
        }
        const params = {
          username: 'karam96gh@gmail.com',
          password: '522122emall',
          mno: code+mob.substring(i),
          msg: 'your code is '+ver,
          sid: 'e-mall',
          fl: '0',
          mt: '0',
        };
        
        // Construct the URL with query parameters
        const queryParams = new URLSearchParams(params);
        const fullUrl = `${url}?${queryParams.toString()}`;
        sendOtpRequest(code+mobb.substring(i),'your code is '+ver);

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
            message : 'Usuario ' + fullName +' fue creado con exito!'
        });
    
    } else {
        return res.json({
            resp: false,
            message : 'Email already exists'
        }); 
    }

}
const resend = async (req = request, res = response) => {
var code='';
    const { mobile,cityCode } = req.body;
    if(cityCode==null)
    {
      code='963';
    }
    else{
      code=cityCode;
    }
    console.log(code);
    const conn = await connect();
    var mobile2;
    if(mobile[0]=='0')
      mobile2=mobile.substring(1);
     else
     mobile2='0'+mobile;
    const hasEmail = await conn.query('SELECT * FROM users WHERE mobile=? or mobile=?',[mobile,mobile2]);

    if( hasEmail[0].length == 1 ){
        const ver = generateRandom4DigitNumber();

        const mob=mobile;
        const updateQuery = 'UPDATE users SET ver = ? WHERE mobile = ? or mobile=?';
        await conn.query(updateQuery, [ver,mobile,mobile2]);
        await conn.end();
        const url = 'http://ciedco-sms.net/api/sendsms.php';
        var i=0;
        if(mob[0]=='0')
        {
          i=1;
        }
        const params = {
          username: 'karam96gh@gmail.com',
          password: '522122emall',
          mno: code+mob.substring(i),
          msg: 'your code is '+ver,
          sid: 'e-mall',
          fl: '0',
          mt: '0',
        };
        sendOtpRequest(code+mob.substring(i),'your code is '+ver);

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
            message : 'hiiii'
        });
    
    } else {
        return res.json({
            resp: false,
            message : 'Email already exists'
        }); 
    }

}
const requestCode = async (req = request, res = response) => {
var code;
  const { mobile,cityCode } = req.body;
  if(cityCode==null)
   code='963';
  else
    code=cityCode;
  console.log(code);
  
  const conn = await connect();
  var mobile2;
       if(mobile[0]=='0')
         mobile2=mobile.substring(1);
        else
        mobile2='0'+mobile;
  const hasEmail =await conn.query('SELECT * FROM users WHERE mobile=? or mobile=?',[mobile,mobile2]);

  if( hasEmail[0].length == 1 ){
      const ver = generateRandom4DigitNumber();

      const mob=mobile;
      const updateQuery = 'UPDATE users SET passwordCode = ? WHERE mobile = ? or mobile=? ';
      await conn.query(updateQuery, [ver,mobile,mobile2]);
      await conn.end();
      const url = 'http://ciedco-sms.net/api/sendsms.php';

      var i=0;
      if(mob[0]=='0')
      {
        i=1;
      }
      const params = {
        username: 'karam96gh@gmail.com',
        password: '522122emall',
        mno: code+mob.substring(i),
        msg: 'your code is '+ver,
        sid: 'e-mall',
        fl: '0',
        mt: '0',
      };
      sendOtpRequest(code+mob.substring(i),'your code is '+ver);
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
          message : 'hiiii'
      });
  
  } else {
      return res.json({
          resp: false,
          message : 'Email already exists'
      }); 
  }

}
const getVersion = async (req = request, res = response ) => {
    return res.json({
        version: 8,
        domain:0,
        nec: false,
        url: 'https://emmall.sy/about'
    });
}
    

const getAllUsers = async ( req, res = response ) => {

  try {
    console.log('getAllUsers');
      const conn = await connect();

      const users = await conn.query('SELECT * FROM users order by id desc');
        
      await conn.end();

      return res.json( {
        user : users[0]
      } );
      
  } catch (err) {
      console.log(err)
  }
 
}

const getUserById = async (req = request, res = response ) => {

  try {
      const conn = await connect();

      const userdb = await conn.query(`CALL SP_GET_USER_BY_ID(?);`, [ req.uidPerson ]);

      conn.end();

      return res.json({
          resp: true,
          message: 'Get user by Id',
          user: userdb[0][0][0]
      });
      
  } catch (err) {
      return res.status(500).json({
          resp: false,
          message: err
      });
  }

}
const activeMarket = async ( req, res = response ) => {

  try {

      const { id,market } = req.body;
         
      const conn = await connect();

      await conn.query('update users set market =? where id=?',[market,id]);

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
const changeFotoProfile = async ( req = request, res = response ) => {

    try {

        const conn = await connect();

        const rows = await conn.query('SELECT image FROM person WHERE uid = ?', [ req.uidPerson ]);

        if( rows[0][0].image != null ){
            await fs.unlink(path.resolve('src/Uploads/Profile/' + rows[0][0].image));
        }

        await conn.query('UPDATE person SET image = ? WHERE uid = ?', [ req.file.filename, req.uidPerson ]);

        await conn.end();
        
        return res.json({
            resp: true,
            message: 'Updated image'
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        }); 
    }
}
const checkCode = async (req = request, res = response) => {
  const { mobile, ver } = req.body;

  try {
    const conn = await connect();
    var mobile2;
    if(mobile[0]=='0')
      mobile2=mobile.substring(1);
     else
     mobile2='0'+mobile;
  
    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE (mobile = ? or mobile=? )AND passwordCode = ?';
    const [userRows] = await conn.query(userQuery, [mobile,mobile2, ver]);
      console.log("kza",mobile);
    if (userRows.length === 0) {
      await conn.end();
      return res.status(404).json({
        resp: false,
        message: 'User not found or invalid verification code',
      });
    }

    // Update user's isVer status
    const updateQuery = 'UPDATE users SET isVer = 1 WHERE mobile = ? or mobile=?';
    await conn.query(updateQuery, [mobile,mobile2]);
    await conn.end();

    return res.json({
      resp: true,
      message: 'Verification success',
    });
  } catch (error) {
    // Handle database errors
    console.error('Database error:', error);
    return res.status(500).json({
      resp: false,
      message: 'An error occurred during user verification',
    });
  }
};
const verUser = async (req = request, res = response) => {
    const { mobile, ver } = req.body;
  
    try {
      const conn = await connect();
      var mobile2;
      if(mobile[0]=='0')
        mobile2=mobile.substring(1);
       else
       mobile2='0'+mobile;
      // Check if the user exists
      const userQuery = 'SELECT * FROM users WHERE (mobile = ? or mobile=?) AND ver = ?';
      const [userRows] = await conn.query(userQuery, [mobile,mobile2, ver]);
        console.log("kza",mobile);
      if (userRows.length === 0) {
        await conn.end();
        return res.status(404).json({
          resp: false,
          message: 'User not found or invalid verification code',
        });
      }
  
      // Update user's isVer status
      const updateQuery = 'UPDATE users SET isVer = 1 WHERE mobile = ? or mobile=?';
      await conn.query(updateQuery, [mobile,mobile2]);
      await conn.end();
  
      return res.json({
        resp: true,
        message: 'Verification success',
      });
    } catch (error) {
      // Handle database errors
      console.error('Database error:', error);
      return res.status(500).json({
        resp: false,
        message: 'An error occurred during user verification',
      });
    }
  };
  
const updateInformationUser = async ( req = request, res = response ) => {

    try {

        const { firstname, lastname, phone, address, reference } = req.body;

        const conn = await connect();

        await conn.query(`CALL SP_UPDATE_INFORMATION(?,?,?,?,?,?);`, [ req.uidPerson, firstname, lastname, phone, address, reference ]);

        await conn.end();

        return res.json({
            resp: true,
            message: 'Infomation personal added'
        });
        
    } catch (err) {
        return res.json({
            resp: false,
            message: err
        });
    }
}

const updateStreetAddress = async ( req, res = response ) => {

   try {

        const { address, reference } = req.body;
        
        const conn = await connect();

        await conn.query(`CALL SP_UPDATE_STREET(?,?,?);`, [ req.uidPerson, address, reference ]);

        await conn.end();
        
        return res.json({
            resp: true,
            message: 'Street Address updated',
        });
        
    } catch (err) {
       return res.status(500).json({
           resp: false,
           message: err,
       });
   }

}
function generateRandom4DigitNumber() {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
  
    // Generate a random number between min and max (inclusive)
    const random4DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return random4DigitNumber;
  }
function sendOtpRequest(phoneNumber, otp, hostname = 'localhost', port = 5000, path = '/send-otp') {
  // تنسيق رقم الهاتف
  if ( phoneNumber.length < 10) {
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
module.exports = {
    addNewUser,
    activeMarket,
    getUserById,
    changeFotoProfile,
    updateInformationUser,
    updateStreetAddress,
    getVersion,
    verUser,
    resend,
    checkCode,
    requestCode,
    updateUserPassword,
    getAllUsers
}