const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');
const io = require('../app');
const getAllAds = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const companies = await conn.query('SELECT * FROM ads');
            console.log('ads');
        await conn.end();
        return res.json(companies[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const insertAd = async (req = request, res = response) => {
    try {
        const { image, productId, companyId } = req.body; // Assuming you are sending data in the request body

        const conn = await connet();

        await conn.query(
            'INSERT INTO `ads`(`image`, `productId`, `companyId`) VALUES (?, ?, ?)',
            [image, productId, companyId]
        );

        await conn.end();

        return res.json({
            resp: true,
            message: 'Ad inserted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err,
        });
    }}



const deleteAd = async (req = request, res = response) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                resp: false,
                message: 'ID is required in the request body',
            });
        }

        const conn = await connet();

        await conn.query('DELETE FROM `ads` WHERE `id` = ?', [id]);

        await conn.end();

        return res.json({
            resp: true,
            message: 'Ad deleted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err,
        });
    }
}




module.exports = {
    getAllAds,
    insertAd,
    
    deleteAd,
}