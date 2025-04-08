const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const multer = require('multer'); // Import multer here
const { uploadImage } = require('../Controller/uploadImage_controller');

const router = Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/Uploads/'); // Set the destination directory for uploaded images
  },
  filename: (req, file, cb) => {
    if(file.originalname.endsWith('mp4'))
    {
      const fileName = Date.now() + '-' + 'emmall.mp4';
      cb(null, fileName);

    }
    else{
      const fileName = Date.now() + '-' + 'emmall.jpg';
      cb(null, fileName);

    }
  },
});

const upload = multer({ storage: storage });

// Define the image upload route
router.post('/upload/uploadImage', validateToken, upload.single('image'), uploadImage);

module.exports = router;
