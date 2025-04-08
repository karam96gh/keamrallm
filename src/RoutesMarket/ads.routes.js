const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllAds ,insertAd,deleteAd} = require('../ControllerMarket/ads_controller');

const router = Router();

router.get('/market/ads/get-all-ads', validateToken,getAllAds);
router.post('/market/ads/add-main-ads', validateToken,insertAd);
router.post('/market/ads/delete-main-ads', validateToken,deleteAd);

module.exports = router;
