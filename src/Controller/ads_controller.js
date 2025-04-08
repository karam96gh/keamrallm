const { response, request } = require('express');
const connet = require('../DataBase/DataBase');
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
        const { image, productId, companyId, type } = req.body; // Assuming you are sending data in the request body

        const conn = await connet();

        await conn.query(
            'INSERT INTO `ads`(`image`, `productId`, `companyId`, `type`) VALUES (?, ?, ?, ?)',
            [image, productId, companyId, type]
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


const getCategoryAds = async ( req = request, res = response ) => {
    try {

        const conn = await connet();
        
        const ads = await conn.query('SELECT * FROM categoryads');

        await conn.end();
        return res.json(ads[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}

const insertCategoryAd = async (req = request, res = response) => {
    try {
        const {categoryId, productId, companyId, image } = req.body; // Assuming you are sending data in the request body

        const conn = await connet();

        await conn.query(
            'INSERT INTO `categoryads`( `categoryId`, `productId`, `companyId`, `image`) VALUES ( ?, ?, ?, ?)',
            [ categoryId, productId, companyId, image]
        );

        await conn.end();

        return res.json({
            resp: true,
            message: 'Category ad inserted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err,
        });
    }
}
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


const deleteCategoryAd = async (req = request, res = response) => {
    try {
        const { id } = req.body;

        const conn = await connet();

        await conn.query('DELETE FROM `categoryads` WHERE `id` = ?', [id]);

        await conn.end();

        return res.json({
            resp: true,
            message: 'Category ad deleted successfully',
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
    getCategoryAds,
    insertCategoryAd,
    deleteAd,
    deleteCategoryAd
}