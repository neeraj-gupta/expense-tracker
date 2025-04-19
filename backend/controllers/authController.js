const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateJwtToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '12h',
    });
}

exports.registerUser = async (req, res) => {
    const {
        fullName,
        email,
        password,
        profileImageUrl
    } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }

    try {
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        const token = generateJwtToken(user._id);

        res.status(201).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

exports.loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }

    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const token = generateJwtToken(user._id);
        res.status(200).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}