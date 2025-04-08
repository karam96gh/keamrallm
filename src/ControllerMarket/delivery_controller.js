const { response, request } = require('express');
const connet = require('../DataBase/DataBaseMarket');

const getAllDeliveries = async (req , res = response) => {
    try {
        const conn = await connet();
        const deliveries = await conn.query('SELECT * FROM delivery');
        await conn.end();
        return res.json(deliveries[0]);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: err.message
        });
    }
};

const addDelivery = async (req , res = response) => {
    try {
        const { mobile, password, fullName, location } = req.body;
        console.log(req.body);

        const conn = await connet();
        await conn.query('INSERT INTO delivery (mobile, password, fullName, location) VALUES (?, ?, ?, ?)', 
            [mobile, password, fullName, location]);
        await conn.end();

        return res.status(200).json({
            resp: true,
            message: 'Delivery added successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: err.message
        });
    }
};
const getDeliveryById = async (req , res = response) => {
    try {
        const { id } = req.body; // Get delivery ID from request URL
        const conn = await connet();

        const [result] = await conn.query(
            'SELECT mobile, fullName, location FROM delivery WHERE id = ?', 
            [id]
        );

        await conn.end();

        if (result.length === 0) {
            return res.status(404).json({
                resp: false,
                message: "Delivery person not found"
            });
        }

        return res.json({
            resp: true,
            mobile: result[0].mobile,
            fullName: result[0].fullName,
            location: result[0].location
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: "Server error"
        });
    }
};

const login = async (req = request, res = response) => {
    try {
        const { mobile, password } = req.body;
        console.log(req.body);

        const conn = await connet();
        const [rows] = await conn.query('SELECT * FROM delivery WHERE mobile = ? AND password = ?', 
            [mobile, password]);
        await conn.end();

        if (rows.length > 0) {
            return res.status(200).json({
                resp: true,
                message: 'Login successful',
                delivery: rows[0]
            });
        } else {
            return res.status(401).json({
                resp: false,
                message: 'Invalid mobile or password'
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: err.message
        });
    }
};

const updateLocation = async (req = request, res = response) => {
    try {
        const { id, location } = req.body;
        console.log(req.body);

        const conn = await connet();
        await conn.query('UPDATE delivery SET location = ? WHERE id = ?', [location, id]);
        await conn.end();

        return res.status(200).json({
            resp: true,
            message: 'Location updated successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: err.message
        });
    }
};

module.exports = {
    getAllDeliveries,
    addDelivery,
    login,
    updateLocation,
    getDeliveryById
};
