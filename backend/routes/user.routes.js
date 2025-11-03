const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const user = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware")
router.post('/registor',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('username').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], user.registor);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], user.login);

router.get('/logout', authMiddleware.authUser, user.logout);
router.get('/profile', authMiddleware.authUser, user.profile);
router.get("/userposts", authMiddleware.authUser, user.userposts);
router.get('/image/:id', user.getFile);
router.get("/allusers", user.allUsers);
module.exports = router;