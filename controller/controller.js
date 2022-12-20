const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices.js')

router.post('/register', async (req, res) => {
    await userServices.registerUser(req, res);
});

router.post('/login', async (req, res) => {
    await userServices.loginUser(req, res);
});

router.post('/verify', async (req, res) => {
    await userServices.verifyUser(req, res);
});

router.post('/forgot', async (req, res) => {
    await userServices.forgotPassword(req, res);
});

router.post('/reset', async (req, res) => {
    await userServices.resetPassword(req, res);
});

router.post('/logout', async (req, res) => {
    await userServices.logoutUser(req, res);
});

router.delete('/delete', async (req, res) => {
    await userServices.deleteUser(req, res);
});

module.exports = router;