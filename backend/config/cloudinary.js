const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Use CLOUDINARY_URL if available, otherwise use individual vars
if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
        secure: true
    });
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'craft-wear',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

module.exports = { cloudinary, storage };
