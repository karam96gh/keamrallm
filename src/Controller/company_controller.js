const { response, request } = require('express');
const connet = require('../DataBase/DataBase');
const io = require('../app');
const getAllCompanies = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const companies = await conn.query('SELECT c.*, COUNT(c.id) AS t FROM companies c LEFT JOIN products p ON c.id = p.companyId GROUP BY c.id ORDER BY ss desc ,t desc;');
        console.log("ssscacompaniestegories");

        await conn.end();
        console.log("companies");

        return res.json(companies[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const getAllCompaniesMarket = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const companies = await conn.query('SELECT * FROM companies where market =1 order by id desc ');
        console.log("ssscacompaniestegories");

        await conn.end();
        console.log("companies");

        return res.json(companies[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const getAllCompaniesa = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const companies = await conn.query('SELECT * FROM companies order by id desc ');
        console.log("ssscacompaniestegories");

        await conn.end();
        console.log("companies");

        return res.json(companies[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const getAllCompaniesios = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const companies = await conn.query('SELECT id,name,image,type FROM companies where  id<>15  order by id desc ');
        console.log("ssscacompaniestegories");

        await conn.end();
        console.log("companies");

        return res.json(companies[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const increment = async ( req, res = response ) => {

    try {

        const { companyId,value } = req.body;
           var x =parseInt(value+"");
        const conn = await connet();

        await conn.query('update companies set subscribe = subscribe+? where id=?',[x,companyId]);

        await conn.end();


        return res.status(200).json({
            resp: true,
            message : 'success'
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message : 'error'
        });
    }
   
}
const addUser = async ( req = request, res = response ) => {
    try {
        const { mobile, companyId } = req.body;

        const conn = await connet();
        
        const user = await conn.query('SELECT * FROM users where mobile=? ',[mobile]);
       if(user[0].length!=0)
       {

        const up = await conn.query('UPDATE users set company =? where mobile =?',[companyId,mobile]);
        await conn.end();

        return res.status(200).json({
            resp: true,
            message: 'done'
        });
       }
       else
       {
        await conn.end();

        return res.status(200).json({
            resp: false,
            message: 'not found'
        });
       }

        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const deleteUser = async ( req = request, res = response ) => {
    try {
        const { mobile } = req.body;

        const conn = await connet();
        
        const user = await conn.query('SELECT * FROM users where mobile=?',[mobile]);
       if(user[0].length!=0)
       {
        const up = await conn.query('UPDATE users set company =0 where mobile =?',[mobile]);
        await conn.end();

        return res.status(200).json({
            resp: true,
            message: 'done'
        });
       }
       else
       {
        await conn.end();

        return res.status(200).json({
            resp: false,
            message: 'not found'
        });
       }

        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const viewUser = async ( req = request, res = response ) => {
    try {
        const { companyId } = req.body;

        const conn = await connet();
        
        const user = await conn.query('SELECT * FROM users where company=?',[companyId]);
      
        await conn.end();
        return res.json(user[0]);

        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }


}
const addCompany = async ( req = request, res = response ) => {
    try {
        var m=0
        const { name, manager, phone, address, city, mobile, image ,pass,salseman,type,canHide,market} = req.body;
        console.log(req.body);
       if(market==null)
        m=0
        else
        m=1
       
          if(pass=='1133557799'||pass=='202320242025')
          {
            const conn = await connet();
         await conn.query('INSERT INTO companies ( name, manager, phone, address, city, mobile, image,salesman,type,canHide,market) VALUES (?,?,?,?,?,?,?,?,?,?,?);',[name, manager, phone, address, city, mobile, image,salseman,type,canHide,m]);
         

         const up = await conn.query('UPDATE users set company =(select id from companies WHERE mobile =?) where mobile =?',[mobile,mobile]);
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          }
          else{
            return res.status(200).json({
                resp: true,
                message: 'success'
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
const updateCompany = async ( req = request, res = response ) => {
    try {
        const { id,name, manager, phone, address, city, mobile, image ,pass,salseman,type,canHide} = req.body;
        console.log(req.body);
       
          if(pass=='1133557799'||pass=='202320242025')
          {
            const conn = await connet();
         await conn.query('update companies set name=?,manager=?,phone=?,address=?,city=?,mobile=?,image=?,salesman=?,type=?,canHide=? where id=?',[name, manager, phone, address, city, mobile, image ,salseman,type,canHide,id]);
         

         const up = await conn.query('UPDATE users set company =(select id from companies WHERE mobile =?) where mobile =?',[mobile,mobile]);
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          }
          else{
            return res.status(200).json({
                resp: true,
                message: 'success'
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
module.exports = {
    getAllCompanies,
    getAllCompaniesa,
    getAllCompaniesios,
    addUser,
    deleteUser,
    viewUser,
    addCompany,
    increment,
    updateCompany,
    getAllCompaniesMarket
}