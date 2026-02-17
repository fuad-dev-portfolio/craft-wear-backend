const express = require('express');
const multer = require('multer');
const router = express.Router();
const { storage, cloudinary } = require('../config/cloudinary');

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ message: err.message || 'Upload failed', error: err.toString() });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('Uploaded to Cloudinary:', req.file.path);
        res.send({
            message: 'Image uploaded',
            image: req.file.path
        });
    });
});

module.exports = router;
