const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticated = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, token not found' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};