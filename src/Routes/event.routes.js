const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllEvents ,addEvent,deleteEvent} = require('../Controller/events_controller');

const router = Router();

router.get('/event/get-all-event', validateToken,getAllEvents);
router.post('/event/addEvent', validateToken,addEvent);
router.post('/event/deleteEvent', validateToken,deleteEvent);



module.exports = router;
