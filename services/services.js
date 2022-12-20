const User = require('../models/UserModels')
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' }); 
    }
    const newUser = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.json({ msg: 'User registered' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
    user.isActive = true;
    await user.save();
    res.json({ msg: 'User logged in' });
}

const verifyUser = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    res.json({ msg: 'User verified' });
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    // Send email

    res.json({ msg: 'Password reset link sent' });
}

const logoutUser = async (req, res) => {    
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    user.isActive = false;
    await user.save();
    res.json({ msg: 'User logged out' });
}

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ msg: 'Password reset' });
}

const deleteUser = async (req, res) => {    
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    await user.remove();
    res.json({ msg: 'User deleted' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    forgotPassword,
    resetPassword,
    deleteUser
}