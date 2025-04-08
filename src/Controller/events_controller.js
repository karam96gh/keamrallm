const { response, request } = require('express');
const connet = require('../DataBase/DataBase');
const io = require('../app');
const getAllEvents = async ( req = request, res = response ) => {
    try {

        const conn = await connet();

        const events = await conn.query('SELECT * FROM events');
        await conn.end();
        return res.json(events[0]);
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const addEvent = async ( req = request, res = response ) => {
    try {
        const { name, image } = req.body;
        console.log(req.body);
        const conn = await connet();
         await conn.query('INSERT INTO events (name, image) VALUES (?,?);',[name, image]);
          
            await conn.end();
            return res.status(200).json({
                resp: true,
                message: 'success'
            });    
          
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}
const deleteEvent = async ( req = request, res = response ) => {
    try {
        const {id} = req.body;
        console.log(req.body);
                   const conn = await connet();
         await conn.query('delete from events where id=?',[id]);
          
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
    getAllEvents,addEvent,deleteEvent
}