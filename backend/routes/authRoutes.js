const express = require('express');

const {
    registerUser,
    loginUser,
    getUserInfo,
    updateUserInfo
} = require('../controllers/authController.js');
const upload = require('../middleware/uploadMiddleware.js');
const { authenticated } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user-info', authenticated, getUserInfo);
router.put('/update-profile', authenticated, updateUserInfo);

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }

    // Do something with the uploaded file
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

    res.status(200).json({
        imageUrl
    });
});

module.exports = router;