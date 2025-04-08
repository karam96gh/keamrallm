const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const {  getAllCompaniesa,addCompany,updateCompany} = require('../ControllerMarket/company_controller');

const router = Router();

router.get('/market/company/get-all-companies', validateToken,getAllCompaniesa);

router.post('/market/company/addCompany', validateToken,addCompany);

router.post('/market/company/updateCompany', validateToken,updateCompany);


module.exports = router;
