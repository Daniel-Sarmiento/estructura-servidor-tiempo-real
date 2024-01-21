const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const notificationsRouter = require('./notifications.route');
const usersRouter = require('./users.route');

router.use('/auth', authRouter);
router.use('/notifications', notificationsRouter);
router.use('/users', usersRouter);

module.exports = router;