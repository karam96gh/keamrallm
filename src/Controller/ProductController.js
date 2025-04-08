const { response, request } = require('express');
const connet = require('../DataBase/DataBase');
const socket = require('../socket'); // Import the socket.js module
const zlib=require('zlib');

const getMostBuyProducts = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const products = await conn.query('SELECT * FROM products where star=1  ');

        await conn.end();

        res.json(
          products[0]
        );
        
    } catch (err) {
        
    }
   
}
const deleteProduct = async ( req, res = response ) => {

    try {

        const { id } = req.body;

        const conn = await connet();

        await conn.query('delete from productsimage where productId=?',[id]);
         await conn.query('delete from products where id=?',[id]);
         try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
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

        const { productId,state,reason } = req.body;
           console.log(productId);
           
        const conn = await connet();

        await conn.query('update products set state =? , reason=? where id=?',[state,reason,productId]);
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
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
const changeTrust = async ( req, res = response ) => {

    try {

        const { productId,trust } = req.body;
           console.log(productId);
           
        const conn = await connet();

        await conn.query('update products set trust=? where id=?',[trust,productId]);
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
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
const changeStar = async ( req, res = response ) => {

    try {

        const { productId,star } = req.body;
           console.log(productId);
           
        const conn = await connet();

        await conn.query('update products set star=? where id=?',[star,productId]);
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
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
const increment = async ( req, res = response ) => {

    try {

        const { productId } = req.body;
           
        const conn = await connet();

        await conn.query('update products set counter = counter+1 where id=?',[productId]);

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

        const { id,companyId,categoryId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,events_id } = req.body;
        eventsValue=events_id || '0';
        const conn = await connet();
        console.log([listOfImages]);
        await conn.query('delete from ProductsImage where productId=?',[id]);
         await conn.query(`CALL Update_Product(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, [ id,companyId,categoryId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,eventsValue]);

        await conn.end();
        try {
            const httpsIo = socket.getHttpsIO();
            httpsIo.emit('updateLatestProducts', { action: 'update', data: { "id": 1 } });
            console.log('updateLatestProducts');

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
const AupdateProduct = async ( req, res = response ) => {

    try {

        const { id,companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,events_id } = req.body;
        eventsValue=events_id || '0';

        const conn = await connet();
        console.log([listOfImages]);
        await conn.query('delete from ProductsImage where productId=?',[id]);
         await conn.query(`CALL AUpdate_Product(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, [ id,companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,eventsValue]);

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
        const products = await conn.query('SELECT products.*, market FROM products join companies on products.companyId =companies.id ORDER BY id DESC');
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
}
const getAllProductsios = async (req, res = response) => {
    try {
        const conn = await connet();
        const products = await conn.query('SELECT * FROM products ');
        console.log('productsios');
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
}
const getAllProductsMarket = async (req, res = response) => {
    try {
        const conn = await connet();
        const products = await conn.query('SELECT * FROM products where categoryId = 48 ORDER BY id DESC');
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
}

const getAllProducts = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const products = await conn.query('SELECT * FROM products  order by id desc ');
        console.log('products');
        await conn.end();

        res.json(
          products[0]
        );
        
    } catch (err) {
        
    }
   
}
const getProductImage = async ( req, res = response ) => {

    try {
        const { productId } = req.body;


        const conn = await connet();

        const images = await conn.query('SELECT * FROM ProductsImage WHERE productId = ?',[productId]);
        console.log("productId");
         conn.end();

        res.json(
            images[0]
        );
        
    } catch (err) {
        
    }
   
}
const addProduct = async ( req, res = response ) => {

        const { companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,events_id} = req.body;
       
        try {
            const eventsValue=events_id || '0';
            const conn = await connet();
            await conn.query(`CALL Add_Product(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, [ companyId,categoryId,subId,name,coverImage,priceFuser,priceFcom,priceFoffer,details,tags,colors,size,shSize,hide,jomlah,listOfImages,eventsValue]);
            
    
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
    getAllProducts,
    getAllProductsMarket,
    getAllProductss,
    getProductImage,
    getMostBuyProducts,
    getAllProductsios,
    addProduct,
    deleteProduct,
    updateProduct,updateAllProduct,
    changeState,
    AupdateProduct,
    increment,
    changeStar,
    changeTrust
}