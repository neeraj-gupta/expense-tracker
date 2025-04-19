const multer = require('multer');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:  (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    const allowedFiles = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedFiles.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit
    }
});

module.exports = upload;