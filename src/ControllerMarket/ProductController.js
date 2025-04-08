const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');


const deleteProduct = async ( req, res = response ) => {

    try {

        const { id } = req.body;

        const conn = await connet();

         await conn.query('delete from products where id=?',[id]);
         try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProductsMarket', { action: 'update', data: { "id": 1 } });
          } catch (error) {
            console.error(error);
          }    
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
const changeState = async ( req, res = response ) => {

    try {

        const { productId,state } = req.body;
           console.log(productId);
           
        const conn = await connet();

        await conn.query('update products set state =?  where id=?',[state,productId]);
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProductsMarket', { action: 'update', data: { "id": 1 } });
          } catch (error) {
            console.error(error);
          }    
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



const updateProduct = async ( req, res = response ) => {

    try {

        const { id,companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,details,tags,size,priceFoffer,maxAmount } = req.body;
        const conn = await connet();
         await conn.query(`CALL AUpdate_Product(?,?,?,?,?,?,?,?,?,?,?,?,?);`, [id,companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,details,tags,size,priceFoffer,maxAmount]);

        await conn.end();
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
          } catch (error) {
            console.error(error);
          }        
        
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

const updateAllProduct = async ( req, res = response ) => {

    try {

        const { companyId,inc,dec,userOrCom } = req.body;

        const conn = await connet();
           
        //  'update products where companyId='
       const comId=parseInt(companyId);
      if(inc!='0' && userOrCom =='0')
      {
        console.log('sss0','');
        const incc= parseFloat(inc)/100;

        await conn.query('UPDATE products SET priceFuser = (select CalculateFinalPrice(priceFuser+priceFuser*?) )where companyId = ?;',[incc,comId]);

      }
      
      if(inc!='0' && userOrCom =='1')
      {
        console.log('sss1','');

        const incc= parseFloat(inc)/100;
        
        await conn.query('UPDATE products SET priceFcom = (select CalculateFinalPrice(priceFcom+priceFcom*?) )where companyId = ?;',[incc,comId]);

      }
      
      if(inc=='0' && userOrCom =='0')
      {
        console.log('sss2',dec);

        const decc= parseFloat(dec)/100;
        
        await conn.query('UPDATE products SET priceFuser = (select CalculateFinalPrice(priceFuser-priceFuser*?) )where companyId = ?;',[decc,comId]);

      }
      
      if(inc=='0' && userOrCom =='1')
      {
        console.log('sss3','');

        const decc= parseFloat(dec)/100;
        
        await conn.query('UPDATE products SET priceFcom = (select CalculateFinalPrice(priceFcom-priceFcom*?) )where companyId = ?;',[decc,comId]);

      }
      
        await conn.end();
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
          } catch (error) {
            console.error(error);
          }            
        
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

const getAllProductss = async (req, res = response) => {
    try {
        const conn = await connet();
        const products = await conn.query('SELECT p.*, c.name AS categoryName, s.name AS subName, comp.name AS companyName FROM products p JOIN subcategories s ON p.subId = s.id JOIN categories c ON s.categoryId = c.id JOIN companies comp ON p.companyId = comp.id ORDER BY id DESC');
        console.log('products');
        await conn.end();

        // Compress the JSON response using gzip
        zlib.gzip(JSON.stringify(products[0]), (err, compressedData) => {
            if (err) {
                console.error('Error compressing data:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                // Set appropriate headers to indicate gzip compression
                res.set({
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'gzip'
                });
                // Send the compressed data to the client
                res.send(compressedData);
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const addProduct = async ( req, res = response ) => {

        const { companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,details,tags,size} = req.body;
       
        try {
            const conn = await connet();
            await conn.query(`CALL Add_Product(?,?,?,?,?,?,?,?,?,?);`, [ companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,details,tags,size]);
            
    
            conn.end();
            try {
                const httpsIo = socket.getHttpsIO();
                httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
              } catch (error) {
                console.error(error);
              }    
            return res.status(200).json({
                resp: true,
                message : 'success'
            });
    
            
    
       } catch (err) {
            return res.status(500).json({
                resp: false,
                message : err
            });
       }
   
}




module.exports = {
    getAllProductss,
    addProduct,
    deleteProduct,
    changeState,
    updateProduct
  
}