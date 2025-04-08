
const {response, request} = require('express');
const connet = require('../DataBase/DataBase');
const bcrypt = require('bcrypt');
const { generarJsonWebToken } = require('../Helpers/JWToken');


const LoginUsuario = async ( req = request, res = response ) => {
var code ='';
    const { mobile, password,cityCode } = req.body;
    if(cityCode ==null)
      code='+963';
    else
    code=cityCode;
      console.log(code);



   try {
      console.log("aloooooooooooo1");
        const conn = await connet();
        var mobile2;
       if(mobile[0]=='0')
         mobile2=mobile.substring(1);
        else
        mobile2='0'+mobile;
        const existsUser = await conn.query('SELECT * FROM users WHERE mobile=? or mobile=?',[mobile,mobile2]);
        const existsCompany = await conn.query('SELECT id from companies where mobile=? or mobile =?',[mobile,mobile2]);
         
        if( existsUser[0].length === 0 ){
            conn.end();
            return res.status(400).json({
                resp: false,
                message : 'Wrong Credentials1'
            });
        }


        const validatedPassword = bcrypt.compareSync(password, existsUser[0][0].password);

        if( !validatedPassword ){

            conn.end();
            return res.status(400).json({
                resp: false,
                message: 'Wrong Credentials2'
            }); 
            
        }

                
        conn.end();
        return res.json({
            resp: true,
            message : 'Welcome to Frave Shop',
            id:existsUser[0][0].id,
            company:existsUser[0][0].company,
            name:existsUser[0][0].fullName,
            phone:existsUser[0][0].mobile,
            isVer:existsUser[0][0].isVer,
            market:existsUser[0][0].market,

            isBoss:existsCompany[0].length
        });

        

   } catch (err) {
        return res.status(500).json({
            resp: false,
            message : err
        });
   }
}

const RenweToken = async ( req = request , res = response ) => {


    const token = await generarJsonWebToken( req.uidPerson );
   
    return res.json({
        resp: true,
        message : 'Welcome to Frave Shop',
        token: token
    });
}


module.exports = {
    LoginUsuario,
    RenweToken,
};