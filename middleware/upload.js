const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
    
        cb(null, fileName);
    },        
});  

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Hanya gambar format JPG/JPEG dan PNG yang dapat diunggah'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000, // 100KB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
