const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { getAllAds,getCategoryAds ,insertAd,insertCategoryAd,deleteAd,deleteCategoryAd} = require('../Controller/ads_controller');

const router = Router();

router.get('/ads/get-all-ads', validateToken,getAllAds);
router.get('/ads/get-category-ads', validateToken,getCategoryAds);
router.post('/ads/add-main-ads', validateToken,insertAd);
router.post('/ads/add-category-ads', validateToken,insertCategoryAd);
router.post('/ads/delete-category-ads', validateToken,deleteCategoryAd);
router.post('/ads/delete-main-ads', validateToken,deleteAd);

module.exports = router;
