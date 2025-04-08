const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');
const io = require('../app');

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




const addCompany = async ( req = request, res = response ) => {
    try {
        const { name,image} = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('INSERT INTO companies ( name,logo) VALUES (?,?);',[name, image]);
         

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
const updateCompany = async ( req = request, res = response ) => {
    try {
        const { id,name, image } = req.body;
        console.log(req.body);
       
          
            const conn = await connet();
         await conn.query('update companies set name=?,logo=?where id=?',[name, image ,id]);
         

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
module.exports = {
    
    getAllCompaniesa,
   
    addCompany,
    updateCompany
}