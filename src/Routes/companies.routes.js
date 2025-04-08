const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllCompanies,getAllCompaniesios, getAllCompaniesa,getAllCompaniesMarket,addUser,deleteUser,viewUser ,addCompany,increment,updateCompany} = require('../Controller/company_controller');

const router = Router();

router.get('/company/get-all-companies', validateToken,getAllCompanies);
router.get('/company/get-all-companiesios', validateToken,getAllCompaniesios);

router.get('/company/get-all-companiesa', validateToken,getAllCompaniesa);
router.get('/company/get-all-companiesMarket', validateToken,getAllCompaniesMarket);

router.post('/company/addUser', validateToken,addUser);
router.post('/company/deleteUser', validateToken,deleteUser);
router.post('/company/viewUser', validateToken,viewUser);
router.post('/company/addCompany', validateToken,addCompany);

router.post('/company/updateCompany', validateToken,updateCompany);

router.post('/company/increment', validateToken,increment);

module.exports = router;
