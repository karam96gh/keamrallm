const { Router } = require('express');
const { addNewUser, getUserById,activeMarket,checkCode,changeFotoProfile,updateUserPassword, requestCode,updateInformationUser,verUser, resend,updateStreetAddress,getVersion ,getAllUsers} = require('../Controller/UserController');
const { uploadsProfile } = require('../Helpers/Multer');
const { validateToken }  = require('../Middlewares/ValidateToken');

const router = Router();

    router.post('/user/add-new-user', addNewUser);
    router.post('/user/ver', validateToken,verUser);
    router.post('/user/active-market', validateToken,activeMarket);

    router.post('/user/resend',validateToken, resend);
    router.post('/user/request-code',validateToken, requestCode);
    router.post('/user/check-code',validateToken, checkCode);
    router.post('/user/updateUserPassword',validateToken, updateUserPassword);
    router.get('/user/get-all-users', validateToken, getAllUsers);
    router.get('/user/get-user-by-id', validateToken, getUserById);
    router.put('/user/update-picture-profile', [ validateToken, uploadsProfile.single('image') ], changeFotoProfile );
    router.put('/user/update-information-user', validateToken, updateInformationUser);
    router.put('/user/update-street-address', validateToken, updateStreetAddress);
    router.get('/user/get-version', validateToken, getVersion);

module.exports = router;